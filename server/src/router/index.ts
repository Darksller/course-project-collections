import express from 'express'

import authentication from './authentication'
import users from './users'
import category from './category'
import collections from './collections'
import tags from './tags'
import dataTypes from './dataTypes'
import items from './items'

const router = express.Router()

export default (): express.Router => {
	items(router)
	dataTypes(router)
	tags(router)
	collections(router)
	category(router)
	users(router)
	authentication(router)
	return router
}
