import express from 'express'

import {
	collectionLike,
	deleteUser,
	getAllUsers,
	getMe,
	isCollectionLiked,
	updateUser,
} from '../controllers/users'
import { isAuthenticated } from '../middlewares'

export default (router: express.Router) => {
	router.get('/users', getAllUsers)
	router.get('/users/getMe', isAuthenticated, getMe)
	router.get('/users/getUserByAccessToken/:', getAllUsers)
	router.delete('/users/:id', isAuthenticated, deleteUser)
	router.patch('/users/:id', isAuthenticated, updateUser)
	router.patch('/users/likeCollection/:id', isAuthenticated, collectionLike)
	router.post(
		'/users/isCollectionLiked/:id',
		isAuthenticated,
		isCollectionLiked
	)
}
