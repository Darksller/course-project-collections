import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	personalCollections: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'PersonalCollections',
			unique: true,
		},
	],
})

export const CategoryModel = mongoose.model('Categories', CategorySchema)

export const getCategories = () => CategoryModel.find()
export const getCategoryById = (id: string) => CategoryModel.findById(id)
export const createCategory = (values: Record<string, any>) =>
	new CategoryModel(values).save().then(category => category.toObject())
