import { CollectionCard } from '@/components/ui/collection-card'
import ItemCard from '@/components/ui/item-card'

export function Collections() {
  return (
    //TODO: Карусель по темам
    <div className="mx-auto mt-12 max-w-1440">
      <div className="flex flex-wrap gap-4 ">
        <ItemCard />
        <CollectionCard />
        <ItemCard />
        <CollectionCard />
        <ItemCard />
        <CollectionCard />
        <ItemCard />
        <CollectionCard />
        <ItemCard />
        <CollectionCard />
        <ItemCard />
        <CollectionCard />
        <ItemCard />
        <CollectionCard />
        <ItemCard />
        <CollectionCard />
        <ItemCard />
        <CollectionCard />
        <ItemCard />
        <CollectionCard />
        <ItemCard />
      </div>
    </div>
  )
}
