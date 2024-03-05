import { NavMenu, Separator } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { contactComponents, menuComponents } from '../model/constants'
import { Link } from '@tanstack/react-router'
import { cn } from '@/shared/lib/utils'
import {
  HamburgerMenuIcon,
  HomeIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons'

type NavPanelProps = {
  className?: string
}

export function NavPanel({ className }: NavPanelProps) {
  const { t } = useTranslation('global')
  return (
    <div className={cn('text-sm', className)}>
      <Link
        className="group flex items-center font-medium sm:flex-col sm:justify-center sm:pr-4"
        to="/"
      >
        <HomeIcon className="mr-2 sm:hidden" />
        {t('header.nav.home')}
        <Separator className="w-0 border-primary transition-all duration-300 group-hover:w-full" />
      </Link>
      <div className="z-[11] flex items-center">
        <HamburgerMenuIcon className="mr-2 sm:hidden" />
        <NavMenu components={menuComponents}>{t('header.nav.menu')}</NavMenu>
      </div>
      <div className="flex items-center">
        <QuestionMarkCircledIcon className="mr-2 sm:hidden" />
        <NavMenu components={contactComponents}>
          {t('header.nav.about')}
        </NavMenu>
      </div>
    </div>
  )
}
