import express from 'express'

import {
	collectionLike,
	deleteUser,
	getAllUsers,
	isCollectionLiked,
	updateUser,
} from '../controllers/users'
import { isAuthenticated } from '../middlewares'

export default (router: express.Router) => {
	router.get('/users', getAllUsers)
	router.delete('/users/:id', isAuthenticated, deleteUser)
	router.patch('/users/:id', isAuthenticated, updateUser)
	router.patch('/users/likeCollection/:id', isAuthenticated, collectionLike)
	router.post(
		'/users/isCollectionLiked/:id',
		isAuthenticated,
		isCollectionLiked
	)
}
