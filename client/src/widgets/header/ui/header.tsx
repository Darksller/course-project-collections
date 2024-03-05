import { SearchBar } from '@/features/header/search'
import { SettingsButton } from './settings-button'
import { AuthDialog } from '@/features/authentication'
import { NavPanel } from '@/features/header/navigation-panel'
import { MobileMenu } from './mobile-menu'
import { Link } from '@tanstack/react-router'
import Logo from '/logo.svg'
export function Header() {
  return (
    <header className="z-[99] m-auto flex justify-between rounded-full bg-secondary/30  px-5 py-[6px] shadow-lg backdrop-blur-xl md:max-w-[700px]">
      <MobileMenu className="sm:hidden" />
      <Link to={'/'} className="flex items-center">
        <img src={Logo} className="h-[24px] pr-2" />
        <h1 className="text-2xl font-bold">DunkVault</h1>
      </Link>
      <NavPanel className="hidden text-sm sm:flex sm:gap-[2px] md:gap-4" />
      <div className="flex items-center justify-center md:gap-4">
        <div className="flex justify-end">
          <SearchBar className="hidden sm:flex" variant="hideable" />
          <AuthDialog />
        </div>
        <SettingsButton />
      </div>
    </header>
  )
}
