import { createCollectionsRoute } from '@/router/routes/collections.routes'
import { EditCollection } from '@/components/ui/collection-edit'

export function CreateCollection() {
  const { categories, dataTypes } = createCollectionsRoute.useLoaderData()

  return (
    <EditCollection
      dataTypes={dataTypes}
      type="create"
      categories={categories}
    />
  )
}
