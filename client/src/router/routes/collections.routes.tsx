import { categoriesApi } from '@/api/categoriesApi'
import { collectionsApi } from '@/api/collectionsApi'
import { dataTypesApi } from '@/api/dataTypesApi'
import { Collections } from '@/pages/AllCollectionsPage'
import { CollectionPage } from '@/pages/CollectionPage'
import { CreateCollection } from '@/pages/CreateCollectionPage'
import { EditCollectionPage } from '@/pages/EditCollectionPage'
import { store } from '@/store/reduxStore'
import { createRoute, redirect } from '@tanstack/react-router'
import { Layout } from '@/components/Layout'
import { Root } from '../__root'

export const collectionsLayoutRoute = createRoute({
  path: '/collections',
  component: Layout,
  getParentRoute: () => Root,
})

export const collectionsRoute = createRoute({
  getParentRoute: () => collectionsLayoutRoute,
  path: '/',
  component: Collections,
})

export const collectionRoute = createRoute({
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

export const editCollectionRoute = createRoute({
  getParentRoute: () => collectionsLayoutRoute,
  path: '/edit/$collectionId',
  component: EditCollectionPage,
  beforeLoad: async ({ context }) => {
    console.log(context.isAuthenticated)
    if (!context.isAuthenticated) {
      context.uiStore.setIsAuthModelOpen(true)
      throw redirect({
        to: '/',
      })
    }
  },
  loader: async ({ params }) => {
    const response = await store.dispatch(
      collectionsApi.endpoints.getCollectionById.initiate(params.collectionId),
    )
    const responseCat = await store.dispatch(
      categoriesApi.endpoints.getCategories.initiate(),
    )
    const typesResponse = await store.dispatch(
      dataTypesApi.endpoints.getDataTypes.initiate(),
    )

    return {
      collection: response.data,
      categories: responseCat.data,
      dataTypes: typesResponse.data,
    }
  },
})

export const createCollectionsRoute = createRoute({
  getParentRoute: () => collectionsLayoutRoute,
  path: '/create',
  component: CreateCollection,
  beforeLoad: async ({ context }) => {
    if (!context.isAuthenticated) {
      context.uiStore.setIsAuthModelOpen(true)
      throw redirect({
        to: '/',
      })
    }
  },
  loader: async () => {
    const response = await store.dispatch(
      categoriesApi.endpoints.getCategories.initiate(),
    )
    const typesResponse = await store.dispatch(
      dataTypesApi.endpoints.getDataTypes.initiate(),
    )
    return { categories: response.data, dataTypes: typesResponse.data }
  },
})
