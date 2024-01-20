import { createUser, getUserByEmail } from '../db/users'
import express from 'express'
import { authentication, random } from '../helpers'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body
		if (!email || !password)
			return res.status(400).json('Invalid email or password')
		const user = await getUserByEmail(email).select(
			'+authentication.salt + authentication.password'
		)

		if (!user) return res.status(400).json('Invalid email or password')
		const expectedHash = authentication(user.authentication.salt, password)
		if (user.authentication.password !== expectedHash)
			return res.status(403).json('Invalid email or password')

		const _user = _.omit(user.toObject(), ['authentication'])
		user.authentication.accessToken = jwt.sign(_user, process.env.SECRET, {
			expiresIn: +process.env.TOKEN_EXPIRATION,
		})
		await user.save()

		return res
			.status(200)
			.json({ user: _user, accessToken: user.authentication.accessToken })
			.end()
	} catch (error) {
		console.log(error)
		return res.status(400).json('Something went wrong...')
	}
}

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { username, email, password } = req.body
		if (!username || !email || !password)
			return res.status(400).json('Invalid data')

		const existingUser = await getUserByEmail(email)
		if (existingUser)
			return res.status(400).json('User with this email already exists')

		const _user = { username, email, role: 'default-user' }
		const accessToken = jwt.sign(_user, process.env.SECRET, {
			expiresIn: +process.env.TOKEN_EXPIRATION,
		})

		const salt = random()
		try {
			const user = await createUser({
				..._user,
				authentication: {
					accessToken,
					salt,
					password: authentication(salt, password),
				},
			})
			return res
				.status(200)
				.json({ user: _.omit(user, ['authentication']), accessToken })
				.end()
		} catch (error) {
			return res.status(400).json('User with this username already exists')
		}
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
