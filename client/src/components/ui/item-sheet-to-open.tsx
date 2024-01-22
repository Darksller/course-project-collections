import { useUiStore } from '@/store/useUiStore'
import { Sheet } from './shadcn-ui/sheet'

type CheckItemToOpenProps = {
  itemId: string
  children: React.ReactElement
}

export function ItemSheetToOpen({ itemId, children }: CheckItemToOpenProps) {
  const { isItemSheetOpen, setIsItemSheetOpen, itemIdToOpen } = useUiStore()

  if (itemIdToOpen !== itemId) {
    return <Sheet>{children}</Sheet>
  }

  return (
    <Sheet open={isItemSheetOpen} onOpenChange={setIsItemSheetOpen}>
      {children}
    </Sheet>
  )
}
