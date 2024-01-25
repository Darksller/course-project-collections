import express from 'express'

import {
	collectionLike,
	deleteUser,
	getAllUsers,
	isCollectionLiked,
	updateUser,
} from '../controllers/users'
import { isAuthenticated, isOwner } from '../middlewares'

export default (router: express.Router) => {
	router.get('/users', isAuthenticated, getAllUsers)
	router.delete('/users/:id', isAuthenticated, isOwner, deleteUser)
	router.patch('/users/:id', isAuthenticated, isOwner, updateUser)
	router.patch('/users/likeCollection/:id', collectionLike)
	router.post('/users/isCollectionLiked/:id', isCollectionLiked)
}
