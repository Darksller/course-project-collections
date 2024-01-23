import { Navigation } from './ui/header/navigation'
import SearchBar from './ui/header/search-bar'
import { Link } from '@tanstack/react-router'
import HeaderScroll from 'react-headroom'
import { useTranslation } from 'react-i18next'
import { SettingsButton } from './ui/header/settings-button'
import { HamburgerMenu } from './ui/header/hamburger-menu'
import { DialogWrapper } from './ui/dialog-wrapper'
import { AuthenticationForm } from './AuthenticationForm'
import { useAuthStore } from '@/store/authStore'
import { ProfileButton } from './ui/header/profile-button'
import { useUiStore } from '@/store/useUiStore'

export function Header() {
  const { isAuthModelOpen, setIsAuthModelOpen } = useUiStore()
  const { isAuth } = useAuthStore()
  const { t } = useTranslation('global')
  return (
    <HeaderScroll>
      <header className="duration-600 w-full bg-white/60 py-2 text-purple-700/100 shadow-lg backdrop-blur-xl transition-all dark:bg-purple-700/50 dark:text-white">
        <div className="relative flex w-full items-center justify-between">
          <div className="flex items-center pl-2 lg:pl-[15%]">
            <HamburgerMenu />
            <Link
              to={'/'}
              className="duration-600 ml-2 flex max-w-28 transition-all hover:tracking-widest max-sm:mr-5"
            >
              <h1 className="text-2xl font-bold ">DunkVault</h1>
              <img
                src="logo.svg"
                className="ml-3 mt-0.5 h-[30px] w-[30px] text-white "
              />
            </Link>
          </div>

          <Navigation className="hidden items-center lg:block" />

          <div className="flex items-center">
            <SearchBar className="mr-6 hidden sm:block" />
            {!isAuth ? (
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
          <SettingsButton className="mr-3" />
        </div>
      </header>
    </HeaderScroll>
  )
}
