import { getItemByIdDb, getItems } from '../db/items'
import express from 'express'

export const getFiveLatestItems = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const items = await getItems()
		items.sort((a, b) => +new Date(b.creationDate) - +new Date(a.creationDate))

		const modifiedItems = items.map(item => {
			return {
				...item.toObject(),
				collection: item.personalCollection,
			}
		})

		return res.status(200).json(modifiedItems)
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
export const getItemById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params
		const item = await getItemByIdDb(id)

		return res.status(200).json(item)
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
