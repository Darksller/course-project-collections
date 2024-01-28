import { categoriesApi } from '@/api/categoriesApi'
import { collectionsApi } from '@/api/collectionsApi'
import { dataTypesApi } from '@/api/dataTypesApi'
import { Collections } from '@/pages/AllCollectionsPage'
import { CollectionPage } from '@/pages/CollectionPage'
import { CreateCollection } from '@/pages/CreateCollectionPage'
import { EditCollectionPage } from '@/pages/EditCollectionPage'
import { store } from '@/store/reduxStore'
import { createRoute } from '@tanstack/react-router'
import { LayoutRoute } from '..'

export const collectionsRoute = createRoute({
  getParentRoute: () => LayoutRoute,
  path: '/',
  component: Collections,
})

export const collectionRoute = createRoute({
  getParentRoute: () => LayoutRoute,
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
  getParentRoute: () => LayoutRoute,
  path: '/edit/$collectionId',
  component: EditCollectionPage,
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
  getParentRoute: () => LayoutRoute,
  path: '/create',
  component: CreateCollection,
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
