import { getFiveLatestItems, getItemById } from '../controllers/items'
import express from 'express'

export default (router: express.Router) => {
	router.get('/items/latest', getFiveLatestItems)
	router.get('/items/:id', getItemById)
}
