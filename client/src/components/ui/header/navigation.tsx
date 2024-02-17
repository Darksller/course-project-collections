import { cn } from '@/lib/utils'
import { Button } from '../shadcn-ui/button'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useUiStore } from '@/store/useUiStore'

type NavProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>

export function Navigation({ className }: NavProps) {
  const { t } = useTranslation('global')
  const { setIsNavSheetOpen } = useUiStore()

  function onNavClicked() {
    setIsNavSheetOpen(false)
  }

  return (
    <nav className={cn(className)}>
      <Button
        variant="ghost"
        className="h-[20px] transition-all duration-300 hover:font-bold hover:text-purple-400 dark:hover:text-white max-lg:block  max-lg:text-lg lg:text-base lg:hover:scale-125"
        onClick={onNavClicked}
      >
        <Link to={'/collections/'}>{t('navigation.collections')}</Link>
      </Button>
      <Button
        variant="ghost"
        className="h-[20px] transition-all duration-300 hover:font-bold hover:text-purple-400 dark:hover:text-white max-lg:block  max-lg:text-lg lg:text-base lg:hover:scale-125"
        onClick={onNavClicked}
      >
        <Link to={'/collections/'}>{t('navigation.catalog')}</Link>
      </Button>
    </nav>
  )
}
