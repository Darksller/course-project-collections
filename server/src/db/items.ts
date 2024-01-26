import mongoose from 'mongoose'
import { CommentModel } from './comments'
import { UserModel } from './users'

const ItemSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	imageUrl: { type: String },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	personalCollection: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'PersonalCollection',
		required: true,
	},
	creationDate: { type: Date, required: true },
	likeCount: { type: Number, required: true, default: 0 },
	tags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tag',
			required: true,
		},
	],
	comments: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
	],
	customFields: [
		{
			fieldName: { type: String, required: true },
			fieldType: { type: mongoose.Schema.Types.Mixed, required: true },
			fieldValue: { type: mongoose.Schema.Types.Mixed, required: true },
		},
	],
})

export const ItemModel = mongoose.model('Item', ItemSchema)

export const getItems = () =>
	ItemModel.find()
		.populate('user')
		.populate('tags')
		.populate('personalCollection')
		.populate({
			path: 'comments',
			model: CommentModel,
			populate: { path: 'user', model: UserModel },
		})
export const getItemByIdDb = (id: string) =>
	ItemModel.findById(id).populate('user').populate('tags')
export const createItem = (values: Record<string, any>) =>
	new ItemModel(values).save().then(item => item.toObject())
export const updateItemById = (id: string, values: Record<string, any>) =>
	ItemModel.findByIdAndUpdate(id, values)

export const itemsToDelete = (_id: any) =>
	ItemModel.find({ personalCollection: _id })
