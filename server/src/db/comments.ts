import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
	content: { type: String, required: true },
	creationDate: { type: Date, required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	likeCount: { type: Number, required: true },
})

export const CommentModel = mongoose.model('Comment', CommentSchema)

export const getComments = () => CommentModel.find().populate('user')
export const deleteCommentById = (id: string) =>
	CommentModel.findOneAndDelete({ _id: id })
export const updateCommentById = (id: string, values: Record<string, any>) =>
	CommentModel.findByIdAndUpdate(id, values)
export const createComment = (values: Record<string, any>) =>
	new CommentModel(values).save().then(comment => comment.toObject())
