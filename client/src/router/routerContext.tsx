import { router } from '.'
import { RouterProvider } from '@tanstack/react-router'
import { UiStore, useUiStore } from '@/store/useUiStore'
import { useAuthStore } from '@/store/authStore'

export type MyContext = {
  isAuthenticated: boolean
  uiStore: UiStore
  fetch?: any[]
}

export function RouterContext() {
  const { isAuthenticated } = useAuthStore()
  const uiStore = useUiStore()
  return (
    <RouterProvider router={router} context={{ isAuthenticated, uiStore }} />
  )
}
