import { App } from '@/App'
import { collectionsApi } from '@/api/collectionsApi'
import { Home } from '@/pages/Home'
import { Users } from '@/pages/Users'
import { store } from '@/store/reduxStore'
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { SearchPage } from '@/pages/SearchPage'
import {
  collectionRoute,
  collectionsRoute,
  createCollectionsRoute,
  editCollectionRoute,
} from './collection-routes'

export const rootRoute = createRootRoute({ component: App })

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

export const LayoutRoute = createRoute({
  path: '/collections',
  component: () => (
    <div className="mx-auto mt-4 max-w-1440 rounded-xl bg-slate-200 bg-opacity-40 backdrop-blur dark:bg-purple-500/60 sm:mt-12">
      <Outlet />
    </div>
  ),
  getParentRoute: () => rootRoute,
})

export const searchRoute = createRoute({
  path: '/search/$searchText',
  component: SearchPage,
  getParentRoute: () => rootRoute,
  loader: async ({ params }) => {
    const response = await store.dispatch(
      collectionsApi.endpoints.search.initiate(params.searchText),
    )

    return {
      collections: response.data?.collections,
      items: response.data?.items,
    }
  },
})

export const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users',
  component: Users,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  searchRoute,
  LayoutRoute.addChildren([
    collectionsRoute,
    collectionRoute,
    createCollectionsRoute,
    editCollectionRoute,
  ]),
  usersRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
