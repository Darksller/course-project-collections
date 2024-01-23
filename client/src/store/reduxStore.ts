import { configureStore } from '@reduxjs/toolkit'

import { authApi } from '../api/authApi'
import { collectionsApi } from '@/api/collectionsApi'
import { fileStorageApi } from '@/api/fileStorageApi'
import { itemsApi } from '@/api/itemsApi'
import { tagsApi } from '@/api/tagsApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [collectionsApi.reducerPath]: collectionsApi.reducer,
    [fileStorageApi.reducerPath]: fileStorageApi.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(collectionsApi.middleware)
      .concat(fileStorageApi.middleware)
      .concat(tagsApi.middleware)
      .concat(itemsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
