import { Collection } from '@/schemas/dbSchemas'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  tagTypes: ['Items'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    getItems: build.query<Collection[], void>({
      query: () => 'items',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Items' as const,
                _id,
              })),
              { type: 'Items', id: 'LIST' },
            ]
          : [{ type: 'Items', id: 'LIST' }],
    }),
    getItemsByCollectionId: build.query<Collection[], void>({
      query: () => 'items',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Items' as const,
                _id,
              })),
              { type: 'Items', id: 'LIST' },
            ]
          : [{ type: 'Items', id: 'LIST' }],
    }),
    getItemById: build.query<Collection, string>({
      query: (_id) => `items/${_id}`,
    }),

    addItem: build.mutation({
      query: (body) => ({
        url: '/collections/items/add',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetItemsQuery, useGetItemByIdQuery, useAddItemMutation } =
  itemsApi
