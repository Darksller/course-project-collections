import {
	addCollection,
	addItemToCollection,
	getAllCollections,
	getCollection,
	getFiveBiggest,
} from '../controllers/collections'
import express from 'express'
import { isAuthenticated } from '../middlewares'

export default (router: express.Router) => {
	router.get('/collections', getAllCollections)
	router.get('/collections/biggest', getFiveBiggest)
	router.get('/collections/:id', getCollection)
	router.post('/collections/add', isAuthenticated, addCollection)
	router.post('/collections/items/add', isAuthenticated, addItemToCollection)
}
