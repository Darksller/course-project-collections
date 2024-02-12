import { Collection } from '@/schemas/dbSchemas'

type DefaultFieldValues = {
  [key: string]: string | boolean | Date | number
}

export const defaultFieldValues: DefaultFieldValues = {
  String: '',
  Boolean: false,
  Date: new Date(),
  Number: 0,
}

export const getDefaultCollectionValues = (collection?: Collection) => ({
  _id: collection?._id || '',
  name: collection?.name || '',
  description: collection?.description || '',
  imageUrl: collection?.imageUrl || '',
  likeCount: collection?.likeCount || 0,
  creationDate: collection?.creationDate || new Date(),
  isClosed: collection?.isClosed || false,
  category: collection?.category._id || '',
  customFields: collection?.customFields || [defaultCustomFieldValues],
})

export const defaultCustomFieldValues = {
  fieldName: '',
  fieldType: '',
}
