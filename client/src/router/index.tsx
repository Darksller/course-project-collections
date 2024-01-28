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
import { Layout } from '@/components/Layout'

export const rootRoute = createRootRoute({ component: App })

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

export const LayoutRoute = createRoute({
  path: '/collections',
  component: Layout,
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

const routeTree = rootRoute.addChildren([
  indexRoute,
  LayoutRoute.addChildren([
    collectionsRoute,
    collectionRoute,
    createCollectionsRoute,
    editCollectionRoute,
    searchRoute,
  ]),
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
