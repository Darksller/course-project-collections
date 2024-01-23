import { CollectionCard } from '@/components/ui/collections/collection-card'
import { collectionsRoute } from '@/routes'

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
