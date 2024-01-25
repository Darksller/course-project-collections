import mongoose from 'mongoose'

const CollectionSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	imageUrl: { type: String },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	isClosed: { type: Boolean, required: true },
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

export const PersonalCollectionModel = mongoose.model(
	'PersonalCollection',
	CollectionSchema
)

export const getCollections = () =>
	PersonalCollectionModel.find()
		.populate('user')
		.populate('category')
		.populate('items')

export const getCollectionById = (id: string) =>
	PersonalCollectionModel.findById(id)
		.populate('user')
		.populate('category')
		.populate('items')

export const createCollection = (values: Record<string, any>) =>
	new PersonalCollectionModel(values)
		.save()
		.then(personalCollection => personalCollection.toObject())

export const updateCollectionById = (id: string, values: Record<string, any>) =>
	PersonalCollectionModel.findByIdAndUpdate(id, values)
