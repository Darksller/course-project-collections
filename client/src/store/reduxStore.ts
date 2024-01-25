import { configureStore } from '@reduxjs/toolkit'

import { authApi } from '../api/authApi'
import { collectionsApi } from '@/api/collectionsApi'
import { itemsApi } from '@/api/itemsApi'
import { tagsApi } from '@/api/tagsApi'
import { categoriesApi } from '@/api/categoriesApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [collectionsApi.reducerPath]: collectionsApi.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(collectionsApi.middleware)
      .concat(tagsApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(itemsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ErrorResponse = {
  status: string
  data: string
}
