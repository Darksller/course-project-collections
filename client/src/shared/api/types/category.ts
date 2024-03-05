import { Collection } from './collection'

export type Category = {
  _id: string
  name: string
  collections: Collection[]
}
