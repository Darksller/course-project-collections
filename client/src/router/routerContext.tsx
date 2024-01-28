import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { router } from '.'
import { RouterProvider } from '@tanstack/react-router'

export function RouterContext() {
  const isAuth = useIsAuthenticated()
  return <RouterProvider router={router} context={{ isAuth }} />
}
