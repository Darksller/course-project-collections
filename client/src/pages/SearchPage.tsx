import { CollectionCard } from '@/components/ui/collections/collection-card'
import { searchRoute } from '@/router'
import { ItemPage } from './ItemPage'
import { v4 } from 'uuid'

export function SearchPage() {
  const { collections, items } = searchRoute.useLoaderData()
  console.log(items)
  return (
    <>
      <div className="text-5xl"> Search result:</div>
      {collections?.map((collection) => (
        <CollectionCard key={collection._id} collection={collection} />
      ))}
      {items?.map((item) => (
        <ItemPage key={v4()} item={item} hideCollection={false} />
      ))}
    </>
  )
}
