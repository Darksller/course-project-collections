import { App } from '@/App'
import { categoriesApi } from '@/api/categoriesApi'
import { collectionsApi } from '@/api/collectionsApi'
import { CollectionPage } from '@/pages/CollectionPage'
import { Collections } from '@/pages/Collections'
import { CreateCollection } from '@/pages/CreateCollection'
import { Home } from '@/pages/Home'
import { Users } from '@/pages/Users'
import { store } from '@/store/reduxStore'
import { Outlet, RootRoute, Route, Router } from '@tanstack/react-router'
const rootRoute = new RootRoute({ component: App })

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

export const collectionsLayoutRoute = new Route({
  path: '/collections',
  component: () => (
    <div className="mx-auto mt-4 max-w-1440 rounded-xl bg-slate-200 bg-opacity-40 backdrop-blur sm:mt-12 dark:bg-purple-500/60">
      <Outlet />
    </div>
  ),
  getParentRoute: () => rootRoute,
})

export const collectionsRoute = new Route({
  getParentRoute: () => collectionsLayoutRoute,
  path: '/',
  component: Collections,
  loader: async () => {
    const response = await store.dispatch(
      collectionsApi.endpoints.getCollections.initiate(),
    )

    return { collections: response.data }
  },
})

export const collectionRoute = new Route({
  getParentRoute: () => collectionsLayoutRoute,
  path: '$collectionId',
  component: CollectionPage,
  loader: async ({ params }) => {
    const response = await store.dispatch(
      collectionsApi.endpoints.getCollectionById.initiate(params.collectionId),
    )

    return { collection: response.data }
  },
})

export const createCollectionsRoute = new Route({
  getParentRoute: () => collectionsLayoutRoute,
  path: '/create',
  component: CreateCollection,
  loader: async () => {
    const response = await store.dispatch(
      categoriesApi.endpoints.getCategories.initiate(),
    )
    return { categories: response.data }
  },
})

export const usersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/users',
  component: Users,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  collectionsLayoutRoute.addChildren([
    collectionsRoute,
    collectionRoute,
    createCollectionsRoute,
  ]),
  usersRoute,
])

export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
