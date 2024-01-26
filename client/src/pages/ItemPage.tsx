import { ItemCard } from '@/components/ui/collections/item-card'
import { ItemSheetToOpen } from '@/components/ui/item-sheet-to-open'
import { Button } from '@/components/ui/shadcn-ui/button'
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
  SheetFooter,
  SheetTitle,
} from '@/components/ui/shadcn-ui/sheet'
import { Item } from '@/schemas/dbSchemas'
import { dummyItemImage } from '@/constants/media'
import { Separator } from '@/components/ui/separator'

type ItemPageProps = {
  item: Item
  hideCollection?: boolean
}

export function ItemPage({ item, hideCollection = true }: ItemPageProps) {
  return (
    <ItemSheetToOpen itemId={item._id}>
      <>
        <SheetTrigger>
          <ItemCard item={item} hideCollection={hideCollection} />
        </SheetTrigger>
        <SheetContent className="overflow-y-scroll scroll-smooth backdrop-blur scrollbar-thin scrollbar-track-white/50 scrollbar-thumb-purple-700/80 lg:w-[40%] dark:bg-purple-950/80 dark:scrollbar-track-white/50 dark:scrollbar-thumb-purple-700/80">
          <SheetHeader className="pb-7">
            <SheetTitle className="text-3xl uppercase md:text-6xl">
              {item.name}
            </SheetTitle>
          </SheetHeader>
          <Separator />
          <div className="grid grid-cols-2 gap-2 p-4 first-line:rounded-xl">
            <div>some</div>
            <img
              className="overflow-hiddenobject-cover h-full w-full  max-sm:h-[200px] "
              src={item.imageUrl}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = dummyItemImage
              }}
            />
          </div>
          <SheetFooter className="py-5">
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </>
    </ItemSheetToOpen>
  )
}
