import express from 'express'
import {
	createCollection,
	getCollectionById,
	getCollections,
} from '../db/collections'

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

export const addCollection = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { name, description, imageUrl, user, category, customFields } =
			req.body
		if (!name || !description || !user || !category)
			return res.status(400).json('Fields are required')

		const newCollection = await createCollection({
			name,
			description,
			imageUrl,
			user,
			category,
			customFields,
		})

		return res.status(200).json(newCollection).end()
	} catch (error) {
		console.log(error)
		return res
			.status(400)
			.json(error.message + ' or collection with this name already exists')
	}
}

export const updateUser = async (
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
