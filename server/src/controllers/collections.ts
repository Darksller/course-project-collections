import express from 'express'
import {
	createCollection,
	getCollectionById,
	getCollections,
} from '../db/collections'
import { createItem } from '../db/items'
import { getUserById } from '../db/users'
import { getCategoryById } from '../db/categories'
import { addAdditionalTags } from '../db/tags'
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
		console.log(collection)
		return res.status(200).json(collection)
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
		if (!owner) return res.status(403).json('No such user')
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
			customFields,
			collection: id,
		}: RequestBody = req.body

		if (!name || !description || !user || tags.length === 0 || !id)
			return res.status(403).json('Some fields are empty or invalid')

		const collection = await getCollectionById(id)
		if (!collection) return res.status(403).json(`The collection doesn't exist`)
		const owner = await getUserById(user)
		if (!owner) return res.status(403).json('No such user')

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
			tgs,
			customFields,
			personalCollection: collection._id,
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
		const { name, description, imageUrl, category, customFields } = req.body
		if (!name || !description || !category)
			return res.status(400).json('Fields are required')
		const collection = await getCollectionById(id)
		if (!collection) return res.status(403).json(`The collection doesn't exist`)
		collection.name = name
		collection.description = description
		collection.imageUrl = imageUrl
		collection.category = category
		collection.customFields = customFields
		await collection.save()
		return res.status(200).json(collection).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
