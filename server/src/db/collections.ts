import mongoose, { Collection } from 'mongoose'

const CollectionSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	imageUrl: { type: String },
	isClosed: { type: Boolean, required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	customFields: [
		{
			fieldState: {
				type: String,
				enum: ['NOT_PRESENT', 'PRESENT_OPTIONAL', 'PRESENT_REQUIRED'],
				required: true,
			},
			fieldName: { type: String, required: true },
			fieldType: { type: mongoose.Schema.Types.Mixed, required: true },
		},
	],
	likeCount: { type: Number, required: true, default: 0 },
	items: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
	],
})

export const CollectionModel = mongoose.model(
	'PersonalCollection',
	CollectionSchema
)

export const getCollections = () =>
	CollectionModel.find().populate('user').populate('category').populate('items')

export const getCollectionById = (id: string) =>
	CollectionModel.findById(id)
		.populate('user')
		.populate('category')
		.populate('items')

export const createCollection = (values: Record<string, any>) =>
	new CollectionModel(values).save().then(collection => collection.toObject())

export const updateCollectionById = (id: string, values: Record<string, any>) =>
	CollectionModel.findByIdAndUpdate(id, values)
