import {
	addCategory,
	getAllCategories,
	getCategory,
} from '../controllers/category'
import express from 'express'
import { isAdmin } from '../middlewares'

export default (router: express.Router) => {
	router.get('/categories', getAllCategories)
	router.get('/categories/:id', getCategory)
	router.post('/categories/add', isAdmin, addCategory)
}
