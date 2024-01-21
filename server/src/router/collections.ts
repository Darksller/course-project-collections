import {
	addCollection,
	getAllCollections,
	getCollection,
} from '../controllers/collections'
import express from 'express'
import { isAuthenticated } from '../middlewares'

export default (router: express.Router) => {
	router.get('/collections', getAllCollections)
	router.get('/collections/:id', getCollection)
	router.post('/collections/add', isAuthenticated, addCollection)
}
