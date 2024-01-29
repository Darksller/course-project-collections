import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { router } from '.'
import { RouterProvider } from '@tanstack/react-router'
import { UiStore, useUiStore } from '@/store/useUiStore'

export type MyContext = {
  isAuthenticated: () => boolean
  uiStore: UiStore
  fetch?: any[]
}

export function RouterContext() {
  const isAuthenticated = useIsAuthenticated()
  const uiStore = useUiStore()
  return (
    <RouterProvider router={router} context={{ isAuthenticated, uiStore }} />
  )
}
