import { CollectionCard } from '@/components/ui/collections/collection-card'
import { searchRoute } from '@/router'
import { ItemPage } from './ItemPage'
import { v4 } from 'uuid'

export function SearchPage() {
  const { collections, items } = searchRoute.useLoaderData()
  return (
    <div className="mx-auto mt-4 max-w-1440 rounded-xl bg-slate-200 bg-opacity-40 backdrop-blur dark:bg-purple-500/60 sm:mt-12">
      <div className="text-5xl"> Search result:</div>
      {collections?.map((collection) => (
        <CollectionCard key={collection._id} collection={collection} />
      ))}
      {items?.map((item) => <ItemPage key={v4()} item={item} />)}
    </div>
  )
}
