import express from 'express'
import { get, merge } from 'lodash'
import jwt from 'jsonwebtoken'

export const credentials = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	res.header('Access-Control-Allow-Origin', 'true')
	next()
}

export const isAuthenticated = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const accessToken = req.cookies[process.env.AUTH_COOKIE]
		if (!accessToken)
			return res.sendStatus(403).json('You must be authenticated')
		const existingUser = jwt.verify(accessToken, process.env.SECRET)
		if (!existingUser)
			return res.sendStatus(403).json('You must be authenticated')
		merge(req, { identity: existingUser })
		return next()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const isOwner = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const { id } = req.params
		const currentUserId = get(req, 'identity._id') as string
		if (!currentUserId) return res.sendStatus(403)
		if (currentUserId.toString() !== id) return res.sendStatus(403)
		next()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const isAdmin = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const accessToken = req.cookies[process.env.AUTH_COOKIE]
		if (!accessToken) return res.sendStatus(403)
		const decodedToken = jwt.decode(accessToken)
		if (typeof decodedToken === 'string') return res.sendStatus(403)
		const { role } = decodedToken
		if (!role) return res.sendStatus(403)
		if (role !== 'ADMIN')
			return res.status(400).json('You must be an administrator')
		return next()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
