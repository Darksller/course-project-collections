import express from 'express'
import jwt from 'jsonwebtoken'

export const fetchMe = async (req: express.Request, res: express.Response) => {
	const accessToken = req.cookies[process.env.AUTH_COOKIE]
	if (!accessToken) return res.status(403).json('You must be authenticated')
	const existingUser = jwt.verify(accessToken, process.env.SECRET)
	if (!existingUser) return res.status(403).json('You must be authenticated')

	return res.status(200).json(existingUser)
}
