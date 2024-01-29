import { rootRouteWithContext } from '@tanstack/react-router'
import { App } from '@/App'
import { MyContext } from './routerContext'

export const Root = rootRouteWithContext<MyContext>()({ component: App })
