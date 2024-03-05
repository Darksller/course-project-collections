import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Separator,
} from '@/shared/ui'
import { useTranslation } from 'react-i18next'

type NavButtonProps = {
  components?: {
    title: string
    href: string
    description: string
  }[]
  children: string
}

export function NavMenu({ components, children }: NavButtonProps) {
  const { t } = useTranslation('global')
  return (
    <NavigationMenu className="group">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <div className="flex flex-col">
              {children}
              <Separator className="w-0 border-primary transition-all duration-300 group-hover:w-full" />
            </div>
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-3 p-2 sm:w-[350px] sm:grid-cols-2">
              {components?.map((component) => (
                <ListItem
                  key={component.title}
                  title={t(component.title)}
                  href={component.href}
                >
                  {t(component.description)}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
