import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '@/shared/api/authApi'
import { collectionsApi } from '@/shared/api/collectionsApi'
import { itemsApi } from '@/shared/api/itemsApi'
import { tagsApi } from '@/shared/api/tagsApi'
import { categoriesApi } from '@/shared/api/categoriesApi'
import { usersApi } from '@/shared/api/usersApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [collectionsApi.reducerPath]: collectionsApi.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(collectionsApi.middleware)
      .concat(tagsApi.middleware)
      .concat(usersApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(itemsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
