import mongoose from 'mongoose'

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
export const getItemByIdDb = (id: string) =>
	ItemModel.findById(id).populate('user').populate('tags')
export const createItem = (values: Record<string, any>) =>
	new ItemModel(values).save().then(item => item.toObject())
export const updateCollectionById = (id: string, values: Record<string, any>) =>
	ItemModel.findByIdAndUpdate(id, values)
