import { User } from './user'

export type Comment = {
  _id?: string
  content: string
  creationDate: Date
  user: User
  likeCount: number
}
