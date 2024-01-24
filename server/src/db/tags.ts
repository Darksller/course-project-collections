import mongoose from 'mongoose'

const TagSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	items: [
		{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Item' },
	],
	color: { type: String, required: true },
})

export const TagModel = mongoose.model('Tag', TagSchema)

export const getTags = () => TagModel.find()
export const addAdditionalTags = (tags: Record<string, any>[]) =>
	TagModel.insertMany(tags)
export const updateTagById = (id: string, values: Record<string, any>) =>
	TagModel.findByIdAndUpdate(id, values)
