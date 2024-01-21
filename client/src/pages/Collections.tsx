import { CollectionCard } from '@/components/ui/collection-card'
import { collectionsRoute } from '@/routes'

export type Collection = {
  _id: string
}

export function Collections() {
  const { collections }: Collection[] = collectionsRoute.useLoaderData()
  return (
    //TODO: Карусель по темам
    <div className="mx-auto mt-12 max-w-1440">
      <div className="flex flex-wrap gap-4 ">
        {collections.map((collection) => (
          <CollectionCard key={collection._id} id={collection._id} />
        ))}
      </div>
    </div>
  )
}
