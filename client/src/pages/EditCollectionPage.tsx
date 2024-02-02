import { editCollectionRoute } from '@/router/routes/collections.routes'
import { EditCollection } from '@/components/ui/collection-edit'

export function EditCollectionPage() {
  const { categories, dataTypes, collection } =
    editCollectionRoute.useLoaderData()

  return (
    <EditCollection
      collection={collection}
      dataTypes={dataTypes}
      type="edit"
      categories={categories}
    />
  )
}
