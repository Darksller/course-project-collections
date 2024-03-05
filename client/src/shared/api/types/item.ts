import { User } from './user'
import { Collection } from './collection'
import { Comment } from './comment'
import { CustomFieldWithValue } from './customField'
import { Tag } from './tag'

export type Item = {
  _id: string
  name: string
  creationDate: Date
  description: string
  imageUrl?: string
  user: User
  personalCollection: Collection
  likeCount: number
  tags: Tag[]
  comments: Comment[]
  customFields?: CustomFieldWithValue[]
}
