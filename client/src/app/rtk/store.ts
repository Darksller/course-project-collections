import { configureStore } from '@reduxjs/toolkit'
import { viewerApi } from '@/entities/viewer/api/viewerApi'
import { collectionsApi } from '@/shared/api/collectionsApi'
import { itemsApi } from '@/shared/api/itemsApi'
import { tagsApi } from '@/shared/api/tagsApi'
import { categoriesApi } from '@/shared/api/categoriesApi'

export const store = configureStore({
  reducer: {
    [viewerApi.reducerPath]: viewerApi.reducer,
    [collectionsApi.reducerPath]: collectionsApi.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(viewerApi.middleware)
      .concat(collectionsApi.middleware)
      .concat(tagsApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(itemsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
