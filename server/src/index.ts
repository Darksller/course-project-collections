import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'
import 'dotenv/config'
import { Server } from 'socket.io'
import { createComment } from './db/comments'
import { getUserById } from './db/users'
import { getItemByIdDb } from './db/items'

const app = express()

app.use(
	cors({
		credentials: true,
		origin: [
			'http://localhost:5173',
			'https://dunk-vault.vercel.app',
			'https://dunk-vault-git-dev-darksllers-projects.vercel.app/',
		],
		allowedHeaders: ['Access-Control-Allow-Origin: *'],
	})
)
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

export const io = new Server(server, {
	cors: {
		origin: '*',
		credentials: true,
	},
})

io.on('connection', socket => {
	socket.on('joinRoom', itemId => {
		socket.join(itemId)
	})

	socket.on('newComment', async (itemId, data) => {
		const comment = await createComment(data)
		const owner = await getUserById(data.user._id)
		owner.comments.push(comment._id)
		await owner.save()

		const item = await getItemByIdDb(itemId)
		item.comments.push(comment._id)
		await item.save()

		socket.to(itemId).emit('onComment', data)
	})
})

mongoose.Promise = Promise
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error.message))

app.use('/', router())

server.listen(process.env.PORT, () => {
	console.log(
		`listening on port http://${process.env.DOMAIN}:${process.env.PORT}`
	)
})
