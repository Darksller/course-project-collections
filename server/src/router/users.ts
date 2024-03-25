import express from 'express'
import { fetchMe } from '../controllers/users'
import { isAuthenticated } from '../middlewares'

export const users = (router: express.Router) => {
	router.get('/users/fetchMe', isAuthenticated, fetchMe)
}
