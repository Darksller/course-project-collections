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
  fieldState: 'NOT_PRESENT' | 'PRESENT_OPTIONAL' | 'PRESENT_REQUIRED'
  fieldName: string
  fieldType: string
}

export type CustomFieldWithValue = CustomField & { fieldValue: string }

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
