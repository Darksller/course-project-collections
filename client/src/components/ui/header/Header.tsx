import { Navigation } from './navigation'
import SearchBar from './search-bar'
import { Link } from '@tanstack/react-router'
import HeaderScroll from 'react-headroom'
import { useTranslation } from 'react-i18next'
import { SettingsButton } from './settings-button'
import { DialogWrapper } from '../dialog-wrapper'
import { AuthenticationForm } from '../authentication/AuthenticationForm'
import { ProfileButton } from './profile-button'
import { useUiStore } from '@/store/useUiStore'
import { useAuthStore } from '@/store/authStore'
import { NavigationMenuDemo } from './lol'

export function Header() {
  const { isAuthenticated } = useAuthStore()
  const { isAuthModelOpen, setIsAuthModelOpen } = useUiStore()

  const { t } = useTranslation('global')
  return (
    <HeaderScroll className="mt-1">
      <header className="duration-600 relative flex items-center justify-between rounded-full bg-secondary/70 px-5 py-2 shadow-lg backdrop-blur-xl transition-all dark:bg-primary/50 lg:mx-[500px]">
        <Link
          to={'/'}
          className="duration-600 flex max-w-28 transition-all hover:tracking-widest"
        >
          <h1 className="text-2xl font-bold">DunkVault</h1>
        </Link>

        <Navigation />
        <NavigationMenuDemo />
        <div className="flex items-center">
          <SearchBar className="hidden sm:block" />
          {!isAuthenticated ? (
            <DialogWrapper
              contentClassName="w-[500px]"
              isModalOpen={isAuthModelOpen}
              setIsModalOpen={setIsAuthModelOpen}
              dialogContent={<AuthenticationForm />}
              dialogTitle={t('authentication')}
              className="rounded-3xl border border-purple-600 px-5 py-1 text-base font-bold tracking-wide transition-all duration-300 hover:scale-105 hover:bg-white/20  hover:text-purple-500 hover:animate-in dark:border-white dark:hover:text-white"
            >
              {t('start')}
            </DialogWrapper>
          ) : (
            <ProfileButton />
          )}
        </div>
        <SettingsButton />
      </header>
    </HeaderScroll>
  )
}
