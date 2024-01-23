import express from 'express'
import { getAllDataTypes } from '../controllers/dataTypes'

export default (router: express.Router) => {
	router.get('/dataTypes', getAllDataTypes)
}
