import { Category } from './category'
import { CustomField } from './customField'
import { Item } from './item'
import { User } from './user'

export type Collection = {
  _id: string
  name: string
  description: string
  imageUrl: string
  creationDate: Date
  isClosed: boolean
  likeCount: number
  items?: Item[]
  user: User
  category: Category
  customFields: CustomField[]
}
