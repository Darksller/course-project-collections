import { CollectionCard } from '@/components/ui/collection-card'
import { collectionsRoute } from '@/routes'

export type Collection = {
  _id: string
  category: {
    _id: string
    name: string
  }
  description: string
  isPrivate: boolean
  name: string
  user: {
    _id: string
    username: string
  }
  imageUrl?: string
  customFields?: [
    {
      fieldState: 'NOT_PRESENT' | 'PRESENT_OPTIONAL' | 'PRESENT_REQUIRED'
      fieldName: string
      fieldType: unknown
    },
  ]
}

export function Collections() {
  const { collections } = collectionsRoute.useLoaderData()
  return (
    //TODO: Карусель по темам
    <div className="mx-auto mt-12 max-w-1440">
      <div className="flex flex-wrap gap-4 ">
        {collections ? (
          collections.map((collection) => (
            <CollectionCard key={collection._id} collection={collection} />
          ))
        ) : (
          <h1 className="text-3xl">No collections was found</h1>
        )}
      </div>
    </div>
  )
}
