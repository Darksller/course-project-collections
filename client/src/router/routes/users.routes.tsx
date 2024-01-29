import { Layout } from '@/components/Layout'
import { createRoute } from '@tanstack/react-router'
import { Root } from '../__root'
import { UserPage } from '@/pages/UserPage'
import { Users } from '@/pages/Users'

export const usersLayoutRoute = createRoute({
  path: '/users',
  component: Layout,
  getParentRoute: () => Root,
})

export const usersRoute = createRoute({
  getParentRoute: () => usersLayoutRoute,
  path: '/',
  component: Users,
})

export const userRoute = createRoute({
  getParentRoute: () => usersLayoutRoute,
  path: '$userId',
  component: UserPage,
})
