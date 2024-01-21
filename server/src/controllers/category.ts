import express from 'express'
import { createCategory, getCategories, getCategoryById } from '../db/category'

export const getAllCategories = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const categories = await getCategories()
		return res.status(200).json(categories)
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const getCategory = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params

		const category = await getCategoryById(id)

		return res.status(200).json(category)
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const addCategory = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { name } = req.body
		if (!name) return res.status(400).json('Fields are required')

		const newCategory = await createCategory({
			name,
		})

		return res.status(200).json(newCategory).end()
	} catch (error) {
		console.log(error)
		return res
			.status(400)
			.json(error.message + ' or collection with this name already exists')
	}
}
