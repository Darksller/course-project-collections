import { useGetCollectionsQuery } from '@/api/collectionsApi'
import { CollectionCard } from '@/components/ui/collections/collection-card'

export function Collections() {
  const { data, isLoading } = useGetCollectionsQuery()

  if (data && data?.length === 0)
    return <h1 className="text-4xl">No collections was found</h1>
  return (
    //TODO: Карусель по темам
    <div className="mt-12 h-svh max-w-1440 rounded-xl backdrop-blur dark:bg-white dark:bg-opacity-40">
      {!isLoading && (
        <div className="flex flex-wrap gap-4 ">
          {data?.map((collection) => (
            <CollectionCard key={collection._id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  )
}
