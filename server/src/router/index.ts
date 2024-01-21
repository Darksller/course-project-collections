import express from 'express'

import authentication from './authentication'
import users from './users'
import category from './category'
import collections from './collections'

const router = express.Router()

export default (): express.Router => {
	collections(router)
	category(router)
	users(router)
	authentication(router)
	return router
}
