import express from 'express'
import { getAllTags } from '../controllers/tags'

export default (router: express.Router) => {
	router.get('/tags', getAllTags)
}
