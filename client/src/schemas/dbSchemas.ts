import * as z from 'zod'

export const CollectionSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  imageUrl: z.string(),
  user: z.string().min(1),
  category: z.string().min(1),
  creationDate: z.date().default(new Date()),
  likeCount: z.number().gte(0),
  isClosed: z.boolean(),
  customFields: z.array(
    z.object({
      fieldName: z.string().min(1),
      fieldType: z.string().min(1),
    }),
  ),
})

export type Collection = {
  _id: string
  category: Category
  description: string
  creationDate: Date
  name: string
  isClosed: boolean
  user: User
  items: Item[]
  imageUrl?: string
  customFields?: CustomField[]
}

export type Category = {
  _id: string
  name: string
  collections: Collection[]
}

export type CustomField = {
  fieldState: 'PRESENT_OPTIONAL' | 'PRESENT_REQUIRED'
  fieldName: string
  fieldType: string
}

export const ItemSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  imageUrl: z.string(),
  creationDate: z.date(),
  user: z.string().min(1),
  collection: z.string().min(1),
  likeCount: z.number().gte(0),
  comments: z.array(z.string().min(1)),
  tags: z.array(
    z.object({
      _id: z.string(),
      name: z.string().min(1),
      color: z.string(),
    }),
  ),
  customFieldsWithValue: z.array(
    z.object({
      fieldName: z.string().min(1),
      fieldType: z.string().min(1),
      fieldValue: z.union([
        z.string().min(1),
        z.boolean(),
        z.date(),
        z.number(),
      ]),
    }),
  ),
})

export type Item = {
  _id: string
  name: string
  creationDate: Date
  description: string
  imageUrl?: string
  user: User
  collection: Collection
  likeCount: number
  tags: Tag[]
  comments: UserComment[]
  customFields?: CustomFieldWithValue[]
}

export type UserComment = {
  _id?: string
  content: string
  creationDate: Date
  user: User
  likeCount: number
}

export type CustomFieldWithValue = CustomField & {
  fieldValue: string | boolean | number | Date
}

export type Tag = {
  _id: string
  name: string
  color: string
  items: Item[]
}

export type User = {
  _id: string
  username: string
  email: string
  role: string
  imageUrl?: string
  likedCollections: string[]
  likedItems: []
  likedComments: []
  collections: Collection[]
  items: Item[]
}
