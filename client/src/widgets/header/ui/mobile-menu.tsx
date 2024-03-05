import { NavPanel } from '@/features/header/navigation-panel'
import { SearchBar } from '@/features/header/search'
import { cn } from '@/shared/lib/utils'
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/shadcn-ui'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Link } from '@tanstack/react-router'

type MobileMenuProps = {
  className?: string
}
export function MobileMenu({ className }: MobileMenuProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Sheet>
        <SheetTrigger>
          <HamburgerMenuIcon className={cn('h-6 w-6')} />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col p-2 px-4 backdrop-blur"
        >
          <Link to={'/'} className="border-b pb-2">
            <h1 className="text-2xl font-bold">DunkVault</h1>
          </Link>
          <NavPanel className="flex flex-col gap-4 text-xl" />
          <SearchBar className="w-full" variant={'default'} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
