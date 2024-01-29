import express from 'express'
import {
	createCollection,
	deleteCollectionById,
	getCollectionById,
	getCollections,
	searchC,
} from '../db/collections'
import { createItem, itemsToDelete, searchI } from '../db/items'
import {
	findLikedByCollectionId,
	findLikedItemsByCollectionId as findLikedItemsByItemId,
	findOwnByCollectionId,
	findOwnItemsByCollectionId as findOwnItemsByItemId,
	getUserById,
} from '../db/users'
import {
	findByCollectionId,
	getCategoryById,
	searchCategory,
} from '../db/categories'
import {
	addAdditionalTags,
	findTagsByCollectionId as findTagsByItemId,
	getTagById,
	searchTags,
} from '../db/tags'
import { RequestBody } from '../types/request'
import { removePTags } from '../helpers'

export const getAllCollections = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const collections = await getCollections()
		return res.status(200).json(collections)
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const getCollection = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params

		const collection = await getCollectionById(id)

		return res.status(200).json(collection)
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const addItemToCollection = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const {
			name,
			description,
			imageUrl,
			user,
			creationDate,
			tags,
			customFieldsWithValue,
			collection: id,
		}: RequestBody = req.body

		if (!name || !description || !user || tags.length === 0 || !id)
			return res.status(403).json('Some fields are empty or invalid')

		const collection = await getCollectionById(id)
		if (!collection) return res.status(403).json(`The collection doesn't exist`)
		const owner = await getUserById(user)
		if (!owner) return res.status(403).json('Are you logged in?')

		if (
			collection.isClosed &&
			collection.user._id.toString() != owner._id.toString()
		)
			return res.status(403).json('This collection is closed')

		const filtredTags = tags.filter(tag => tag._id === '')
		const newTags = await addAdditionalTags(
			filtredTags.map(tag => ({ name: tag.name, color: tag.color }))
		)
		const oldTags = tags.filter(tag => tag._id !== '')
		const tgs = [...newTags, ...oldTags]

		const newItem = await createItem({
			name,
			description,
			creationDate,
			imageUrl,
			user,
			tags: tgs,
			customFields: customFieldsWithValue,
			personalCollection: collection._id,
		})

		tgs.forEach(async element => {
			const tag = await getTagById(element._id)
			tag.items.push(newItem._id)
			await tag.save()
		})

		collection.items.push(newItem._id)
		await collection.save()

		owner.items.push(newItem._id)
		await owner.save()

		return res.status(200).json(newItem).end()
	} catch (error) {
		console.log(error.message)
		return res.status(400).json('This items name is taken ')
	}
}

export const getFiveBiggest = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const collections = await getCollections()
		collections.sort((a, b) => b.items.length - a.items.length)
		const topFiveCollections = collections.slice(0, 5)
		return res.status(200).json(topFiveCollections)
	} catch (error) {
		console.log(error.message)
		return res.status(400)
	}
}

export const updateCollection = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params
		const { name, description, imageUrl, category, customFields, isClosed } =
			req.body

		if (!name || !description || !category)
			return res.status(400).json('Fields are required')

		const collection = await getCollectionById(id)

		if (!collection) return res.status(403).json(`The collection doesn't exist`)

		collection.name = name
		collection.description = description
		collection.imageUrl = imageUrl
		collection.category = category
		collection.customFields = customFields
		collection.isClosed = isClosed
		await collection.save()
		return res.status(200).json(collection).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const addCollection = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const {
			name,
			description,
			imageUrl,
			user,
			category,
			customFields,
			creationDate,
			isClosed = false,
		} = req.body

		if (!name || !description || !user || !category)
			return res.status(400).json('Fields are required')

		const owner = await getUserById(user)
		if (!owner) return res.status(403).json('Are you logged in?')
		const cat = await getCategoryById(category)
		if (!cat) return res.status(403).json('No such category')

		const newDescription = removePTags(description)

		const newCollection = await createCollection({
			name,
			creationDate,
			description: newDescription,
			imageUrl,
			user: owner._id,
			category: cat._id,
			customFields,
			isClosed,
		})

		cat.personalCollections.push(newCollection._id)
		await cat.save()
		owner.collections.push(newCollection._id)
		await owner.save()

		return res.status(200).json(newCollection).end()
	} catch (error) {
		console.log(error)
		return res
			.status(400)
			.json(error.message + ' or collection with this name already exists')
	}
}

export const deleteCollection = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params

		const category = await findByCollectionId(id)
		category.personalCollections = category.personalCollections.filter(
			pcId => pcId.toString() !== id
		)
		await category.save()

		const userOwn = await findOwnByCollectionId(id)
		userOwn.collections = userOwn.collections.filter(
			pcId => pcId.toString() !== id
		)
		await userOwn.save()

		const userLiked = await findLikedByCollectionId(id)
		if (userLiked) {
			userLiked.likedCollections = userLiked.likedCollections.filter(
				pcId => pcId.toString() !== id
			)
			await userLiked.save()
		}

		const items = await itemsToDelete(id)
		items.forEach(async item => {
			const id = item._id
			const userOwnItems = await findOwnItemsByItemId(id.toString())

			userOwnItems.items = userOwnItems.items.filter(
				pcId => pcId.toString() !== id.toString()
			)
			await userOwnItems.save()

			const userLikedItems = await findLikedItemsByItemId(id.toString())
			if (userLikedItems) {
				userLikedItems.likedItems = userLikedItems.likedItems.filter(
					pcId => pcId.toString() !== id.toString()
				)
				await userLikedItems.save()
			}
			const tag = await findTagsByItemId(id.toString())
			tag.items = tag.items.filter(pcId => pcId.toString() !== id.toString())
			await tag.save()
		})

		const deletionPromises = items.map(item => item.deleteOne())
		await Promise.all(deletionPromises)

		const deletedCollection = await deleteCollectionById(id)

		return res.json(deletedCollection)
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const search = async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	const collections = await searchC(id)
	const collectionsByCategory = await searchCategory(id)
	const itemsByTags = await searchTags(id)
	const items = await searchI(id)
	res.status(200).json({
		collections: [
			...collections,
			...collectionsByCategory.map(item => item.personalCollections).flat(),
		],
		items: [...items, ...itemsByTags.map(item => item.items).flat()],
	})
}
