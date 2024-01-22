import { routes } from '@/routes/routes'
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
      {routes.map((route, i) => (
        <Button
          key={i}
          asChild
          variant="ghost"
          className="h-[20px] transition-all duration-300 hover:font-bold hover:text-purple-400 max-lg:block max-lg:px-2 max-lg:py-1 max-lg:text-lg lg:text-base lg:hover:scale-125 dark:hover:text-white"
          onClick={onNavClicked}
        >
          <Link key={i} to={route.href}>
            {t(`navigation.${route.label}`)}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
