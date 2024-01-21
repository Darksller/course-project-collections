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
  isClosed: boolean
  user: {
    _id: string
    username: string
  }
  imageUrl?: string
  customFields?: [
    {
      fieldState: 'NOT_PRESENT' | 'PRESENT_OPTIONAL' | 'PRESENT_REQUIRED'
      fieldName: string
      fieldType: string
    },
  ]
}

export function Collections() {
  const { collections } = collectionsRoute.useLoaderData()
  if (!collections)
    return <h1 className="text-4xl">No collections was found</h1>
  return (
    //TODO: Карусель по темам
    <div className="mx-auto mt-12 h-svh max-w-1440 rounded-xl backdrop-blur dark:bg-white dark:bg-opacity-40">
      <div className="flex flex-wrap gap-4 ">
        {collections.map((collection) => (
          <CollectionCard key={collection._id} collection={collection} />
        ))}
      </div>
    </div>
  )
}
