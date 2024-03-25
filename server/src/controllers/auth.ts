import {
	createUser,
	getUserByEmail,
	getUserByRefreshToken,
} from '../schemas/users'
import express from 'express'
import { authentication, random } from '../utils'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body

		if (!email || !password)
			return res.status(400).json('Invalid email or password')

		const user = await getUserByEmail(email).select(
			'+authentication.salt + authentication.password + authentication.refreshToken'
		)

		if (!user) return res.status(400).json('Invalid email or password')

		const expectedHash = authentication(user.authentication.salt, password)

		if (user.authentication.password !== expectedHash)
			return res.status(403).json('Invalid email or password')

		const refreshToken = jwt.sign(
			{ random: random() },
			process.env.REFRESH_SECRET,
			{
				expiresIn: +process.env.REFRESH_TOKEN_EXPIRATION,
			}
		)
		user.authentication.refreshToken = refreshToken
		await user.save()

		const accessToken = jwt.sign(
			{
				email: user.email,
				role: user.role,
				username: user.username,
			},
			process.env.SECRET,
			{
				expiresIn: +process.env.TOKEN_EXPIRATION,
			}
		)

		res.cookie(process.env.AUTH_COOKIE, accessToken, {
			httpOnly: false,
			secure: true,
		})

		return res
			.status(200)
			.json({
				user: {
					email: user.email,
					role: user.role,
					username: user.username,
				},
				accessToken,
				refreshToken: refreshToken,
			})
			.end()
	} catch (error) {
		console.log(error)
		return res.status(400).json('Something went wrong...')
	}
}

export const refresh = async (req: express.Request, res: express.Response) => {
	try {
		const { refreshToken } = req.body

		if (!refreshToken) return res.sendStatus(401)

		const user = await getUserByRefreshToken(refreshToken).select(
			'+authentication.refreshToken'
		)

		if (refreshToken !== user.authentication.refreshToken)
			return res.sendStatus(401)

		const accessToken = jwt.sign(
			{ email: user.email, role: user.role, username: user.username },
			process.env.ACCESS_SECRET,
			{
				expiresIn: +process.env.ACCESS_TOKEN_EXPIRATION,
			}
		)

		const newRefreshToken = jwt.sign(
			{ random: random() },
			process.env.REFRESH_SECRET,
			{
				expiresIn: +process.env.REFRESH_TOKEN_EXPIRATION,
			}
		)

		user.authentication.refreshToken = newRefreshToken
		await user.save()

		res.cookie(process.env.AUTH_COOKIE, accessToken, {
			httpOnly: false,
			secure: true,
		})

		return res.status(200).json({ accessToken, refreshToken })
	} catch (error) {
		console.log(error)
		return res.sendStatus(404)
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

		const accessToken = jwt.sign(
			{ email: _user.email, role: _user.role, username: _user.username },
			process.env.ACCESS_SECRET,
			{
				expiresIn: +process.env.ACCESS_TOKEN_EXPIRATION,
			}
		)
		const refreshToken = jwt.sign(
			{ random: random() },
			process.env.REFRESH_SECRET,
			{
				expiresIn: +process.env.REFRESH_TOKEN_EXPIRATION,
			}
		)

		const salt = random()

		await createUser({
			..._user,
			authentication: {
				refreshToken,
				salt,
				password: authentication(salt, password),
			},
		})

		res.cookie(process.env.AUTH_COOKIE, accessToken, {
			httpOnly: false,
			secure: true,
		})

		return res
			.status(200)
			.json({
				accessToken,
				refreshToken,
			})
			.end()
	} catch (error) {
		console.log(error.message)
		return res.sendStatus(400)
	}
}