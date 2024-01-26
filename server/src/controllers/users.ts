import express from 'express'
import { deleteUserById, getUserById, getUsers } from '../db/users'
import mongoose from 'mongoose'

export const getAllUsers = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const users = await getUsers()
		return res.status(200).json(users)
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const deleteUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params

		const deletedUser = await deleteUserById(id)

		return res.json(deletedUser)
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const updateUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params
		const { username } = req.body
		if (!username) return res.sendStatus(400)
		const user = await getUserById(id)
		if (!user) return res.sendStatus(403)
		user.username = username
		await user.save()
		return res.status(200).json(user).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const collectionLike = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params
		const { collectionId } = req.body
		if (!collectionId) return res.sendStatus(400)
		const user = await getUserById(id)
		const isLikedIndex = user.likedCollections.findIndex(
			likedId => likedId == collectionId
		)

		if (isLikedIndex === -1) {
			user.likedCollections.push(new mongoose.Types.ObjectId(collectionId))
			await user.save()
			res.status(200).json(true)
		} else {
			user.likedCollections.splice(isLikedIndex, 1)
			await user.save()
			res.status(200).json(false)
		}
	} catch (error) {
		console.log(error)
		res.sendStatus(400)
	}
}

export const isCollectionLiked = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params
		const { collectionId } = req.body
		if (!collectionId) return res.sendStatus(400)
		const user = (await getUserById(id)).toObject()
		const isLikedIndex = user.likedCollections.filter(
			pcId => pcId.toString() === collectionId
		)
		console.log(user)
		console.log(collectionId)
		if (isLikedIndex) {
			return res.status(200).json(false)
		}
		return res.status(200).json(true)
	} catch (error) {
		console.log(error)
		res.sendStatus(400)
	}
}
