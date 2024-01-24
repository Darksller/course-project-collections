import mongoose from 'mongoose'

const DataTypeSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
})

export const DataTypeModel = mongoose.model('DataType', DataTypeSchema)

export const getDataTypes = () => DataTypeModel.find()
