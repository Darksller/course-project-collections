import mongoose from 'mongoose'
import { UserModel } from './users'
import { PersonalCollectionModel } from './collections'
import { CommentModel } from './comments'

const TagSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	items: [
		{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Item' },
	],
	color: { type: String, required: true },
}).index({ name: 'text' }, { name: 'index' })

export const TagModel = mongoose.model('Tag', TagSchema)

export const getTags = () => TagModel.find().populate('items')
export const addAdditionalTags = (tags: Record<string, any>[]) =>
	TagModel.insertMany(tags)
export const updateTagById = (id: string, values: Record<string, any>) =>
	TagModel.findByIdAndUpdate(id, values)
export const getTagById = (id: string) => TagModel.findById(id)

export const findTagsByCollectionId = (id: string) =>
	TagModel.findOne({
		items: id,
	})

export const searchTags = (text: string) =>
	TagModel.find({ $text: { $search: text } }).populate({
		path: 'items',
		populate: [
			{ path: 'user', model: UserModel },
			{ path: 'personalCollection', model: PersonalCollectionModel },
			{ path: 'tags', model: TagModel },
			{
				path: 'comments',
				model: CommentModel,
				populate: { path: 'user', model: UserModel },
			},
		],
	})
