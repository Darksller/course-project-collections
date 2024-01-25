import { getTags } from '../db/tags'
import express from 'express'
export const getAllTags = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const tags = await getTags()

		return res.status(200).json(tags)
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
