import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	personalCollections: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'PersonalCollection',
		},
	],
})

export const CategoryModel = mongoose.model('Category', CategorySchema)

export const getCategories = () => CategoryModel.find()
export const getCategoryById = (id: string) => CategoryModel.findById(id)
export const createCategory = (values: Record<string, any>) =>
	new CategoryModel(values).save().then(category => category.toObject())
