import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
	content: { type: String, required: true },
	date: { type: Date, required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		required: true,
	},
	likeCount: { type: Number, required: true },
})

export const CommentModel = mongoose.model('Comments', CommentSchema)

export const getComments = () => CommentModel.find().populate('user')
export const deleteCommentById = (id: string) =>
	CommentModel.findOneAndDelete({ _id: id })
export const updateCommentById = (id: string, values: Record<string, any>) =>
	CommentModel.findByIdAndUpdate(id, values)
