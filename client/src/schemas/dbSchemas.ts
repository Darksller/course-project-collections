import * as z from 'zod'

export type Collection = {
  _id: string
  category: {
    _id: string
    name: string
  }
  description: string
  name: string
  isClosed: boolean
  user: {
    _id: string
    username: string
  }
  items: Item[]
  imageUrl?: string
  customFields?: CustomField[]
}

export type Comment = {
  content: string
  date: Date
  user: User
  likeCount: number
}

export const ItemSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  imageUrl: z.string(),
  user: z.string().min(1),
  collection: z.string().min(1),
  likeCount: z.number().gte(0),
  comments: z.array(z.string().min(1)),
  tags: z.array(
    z.object({
      _id: z.string(),
      color: z.string(),
    }),
  ),
  //.min(1, { message: 'Tags is required' })
  customFieldsWithValue: z.array(
    z.object({
      fieldName: z.string().min(1),
      fieldType: z.string().min(1),
      fieldValue: z.union([z.string(), z.boolean(), z.date(), z.number()]),
      fieldState: z.string().min(1),
    }),
  ),
})

export type Item = {
  _id: string
  name: string
  description: string
  imageUrl?: string
  user: User
  collection: Collection
  likeCount: number
  tags: Tag[]
  comments: Comment[]
  customFields?: CustomFieldWithValue[]
}

export type CustomField = {
  fieldState: 'PRESENT_OPTIONAL' | 'PRESENT_REQUIRED'
  fieldName: string
  fieldType: string
}

export type CustomFieldWithValue = CustomField & {
  fieldValue: string | boolean | number | Date
}

export type Tag = {
  _id: string
  name: string
  color: string
}

export type User = {
  _id: string
  username: string
  email: string
  role: string
  imageUrl?: string
}
