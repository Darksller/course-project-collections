import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	imageUrl: { type: String },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	collection: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Collection',
		required: true,
	},
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
			fieldState: {
				type: String,
				enum: ['NOT_PRESENT', 'PRESENT_OPTIONAL', 'PRESENT_REQUIRED'],
				required: true,
			},
			fieldName: { type: String, required: true },
			fieldType: { type: mongoose.Schema.Types.Mixed, required: true },
			fieldValue: { type: mongoose.Schema.Types.Mixed, required: true },
		},
	],
})

export const ItemModel = mongoose.model('Item', ItemSchema)

export const getItems = () =>
	ItemModel.find().populate('user').populate('tags').populate('comments')

export const createItem = (values: Record<string, any>) =>
	new ItemModel(values).save().then(item => item.toObject())
export const updateCollectionById = (id: string, values: Record<string, any>) =>
	ItemModel.findByIdAndUpdate(id, values)
