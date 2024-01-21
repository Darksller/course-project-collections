import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'
import 'dotenv/config'

const app = express()

app.use(
	cors({
		credentials: true,
		origin: ['http://localhost:5173', 'https://dunk-vault.vercel.app'],
	})
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
	console.log(
		`listening on port http://${process.env.DOMAIN}:${process.env.PORT}`
	)
})

mongoose.Promise = Promise
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error.message))

app.use('/', router())
