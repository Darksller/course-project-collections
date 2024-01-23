import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	imageUrl: { type: String },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		required: true,
	},
	personalCollection: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'PersonalCollections',
		required: true,
	},
	likeCount: { type: Number, required: true, default: 0 },
	tags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tags',
			required: true,
		},
	],
	comments: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments', required: true },
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

export const ItemModel = mongoose.model('Items', ItemSchema)

export const getItems = () =>
	ItemModel.find().populate('user').populate('tags').populate('comments')

export const createItem = (values: Record<string, any>) =>
	new ItemModel(values).save().then(item => item.toObject())
export const updateCollectionById = (id: string, values: Record<string, any>) =>
	ItemModel.findByIdAndUpdate(id, values)
