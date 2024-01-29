import mongoose from 'mongoose'
import { UserModel } from './users'

const CategorySchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	personalCollections: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'PersonalCollection',
		},
	],
}).index({ name: 'text' }, { name: 'index' })

export const CategoryModel = mongoose.model('Category', CategorySchema)

export const getCategories = () => CategoryModel.find()
export const getCategoryById = (id: string) => CategoryModel.findById(id)
export const createCategory = (values: Record<string, any>) =>
	new CategoryModel(values).save().then(category => category.toObject())
export const findByCollectionId = (id: string) =>
	CategoryModel.findOne({
		personalCollections: id,
	})

export const searchCategory = (text: string) =>
	CategoryModel.find({ $text: { $search: text } }).populate({
		path: 'personalCollections',
		populate: [
			{ path: 'user', model: UserModel },
			{ path: 'category', model: CategoryModel },
		],
	})
