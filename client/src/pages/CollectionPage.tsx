import { collectionRoute } from '@/routes'

export function CollectionPage() {
  const { collection } = collectionRoute.useLoaderData()
  return <div>Collection</div>
}
