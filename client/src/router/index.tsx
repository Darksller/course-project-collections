import { collectionsApi } from '@/api/collectionsApi'
import { Home } from '@/pages/Home'
import { store } from '@/store/reduxStore'
import { createRoute, createRouter } from '@tanstack/react-router'
import { SearchPage } from '@/pages/SearchPage'
import {
  collectionRoute,
  collectionsRoute,
  createCollectionsRoute,
  editCollectionRoute,
} from './routes/collection.routes'
import { Layout } from '@/components/Layout'
import { Root } from './__root'

const indexRoute = createRoute({
  getParentRoute: () => Root,
  path: '/',
  component: Home,
})

export const LayoutRoute = createRoute({
  path: '/collections',
  component: Layout,
  getParentRoute: () => Root,
})

export const searchRoute = createRoute({
  path: '/search/$searchText',
  component: SearchPage,
  getParentRoute: () => Root,
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

const routeTree = Root.addChildren([
  indexRoute,
  LayoutRoute.addChildren([
    collectionsRoute,
    collectionRoute,
    createCollectionsRoute,
    editCollectionRoute,
    searchRoute,
  ]),
])

export const router = createRouter({
  routeTree,
  context: {
    isAuthenticated: undefined!,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
