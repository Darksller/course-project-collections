import { getDataTypes } from '../db/dataTypes'
import express from 'express'
export const getAllDataTypes = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const dataTypes = await getDataTypes()
		return res.status(200).json(dataTypes)
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
