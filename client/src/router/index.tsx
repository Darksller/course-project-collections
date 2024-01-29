import { collectionsApi } from '@/api/collectionsApi'
import { Home } from '@/pages/Home'
import { store } from '@/store/reduxStore'
import { createRoute, createRouter } from '@tanstack/react-router'
import { SearchPage } from '@/pages/SearchPage'
import {
  collectionsLayoutRoute,
  collectionRoute,
  collectionsRoute,
  createCollectionsRoute,
  editCollectionRoute,
} from './routes/collections.routes'
import { Root } from './__root'
import { userRoute, usersLayoutRoute, usersRoute } from './routes/users.routes'
import { Layout } from '@/components/Layout'

const indexRoute = createRoute({
  getParentRoute: () => Root,
  path: '/',
  component: Home,
})

export const searchLayout = createRoute({
  path: '/search',
  component: Layout,
  getParentRoute: () => Root,
})

export const searchRoute = createRoute({
  path: '$searchText',
  component: SearchPage,
  getParentRoute: () => searchLayout,
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
  collectionsLayoutRoute.addChildren([
    collectionsRoute,
    collectionRoute,
    createCollectionsRoute,
    editCollectionRoute,
    searchRoute,
  ]),
  usersLayoutRoute.addChildren([usersRoute, userRoute]),
  searchLayout.addChildren([searchRoute]),
])

export const router = createRouter({
  routeTree,
  context: {
    isAuthenticated: undefined!,
    uiStore: undefined!,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
