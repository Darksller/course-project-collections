export type Collection = {
  _id: string
  category: {
    _id: string
    name: string
  }
  description: string
  isPrivate: boolean
  name: string
  isClosed: boolean
  user: {
    _id: string
    username: string
  }
  items: Item[]
  imageUrl?: string
  customFields?: [
    {
      fieldState: 'NOT_PRESENT' | 'PRESENT_OPTIONAL' | 'PRESENT_REQUIRED'
      fieldName: string
      fieldType: string
    },
  ]
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
  customFields?: [
    {
      fieldState: 'NOT_PRESENT' | 'PRESENT_OPTIONAL' | 'PRESENT_REQUIRED'
      fieldName: string
      fieldType: string
      fieldValue: unknown
    },
  ]
}
export type Tag = {
  name: string
}

export type User = {
  _id: string
  username: string
  email: string
  role: string
  imageUrl?: string
}
