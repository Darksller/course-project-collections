import { validateEmail } from '../helpers'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true, select: true },
	email: {
		type: String,
		required: true,
		unique: true,
		select: true,
		validate: [validateEmail, 'Please fill a valid email address'],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please fill a valid email address',
		],
	},
	role: { type: String, required: true, select: true },
	authentication: {
		password: { type: String, required: false, select: false },
		salt: { type: String, select: false },
		accessToken: { type: String, select: false },
	},
})

export const UserModel = mongoose.model('User', UserSchema)

export const getUsers = () => UserModel.find()
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserByAccessToken = (accessToken: string) =>
	UserModel.findOne({ 'authentication.accessToken': accessToken })
export const getUserById = (id: string) => UserModel.findById(id)
export const createUser = (values: Record<string, any>) =>
	new UserModel(values).save().then(user => user.toObject())
export const deleteUserById = (id: string) =>
	UserModel.findOneAndDelete({ _id: id })
export const updateUserById = (id: string, values: Record<string, any>) =>
	UserModel.findByIdAndUpdate(id, values)
