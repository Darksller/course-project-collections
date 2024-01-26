import { Collection, Item } from '@/schemas/dbSchemas'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const collectionsApi = createApi({
  reducerPath: 'collectionsApi',
  tagTypes: ['Collections'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
    prepareHeaders(headers) {
      return headers
    },
  }),
  endpoints: (build) => ({
    getCollections: build.query<Collection[], void>({
      query: () => 'collections',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Collections' as const,
                _id,
              })),
              { type: 'Collections', id: 'LIST' },
            ]
          : [{ type: 'Collections', id: 'LIST' }],
    }),

    getBiggest: build.query<Collection[], void>({
      query: () => '/collections/biggest',
    }),

    getCollectionById: build.query<Collection, string>({
      query: (_id) => `collections/${_id}`,
    }),

    search: build.query<{ collections: Collection[]; items: Item[] }, string>({
      query: (_id) => `/search/${_id}`,
      keepUnusedDataFor: 0.1,
    }),

    deleteCollection: build.mutation<boolean, string>({
      query: (_id) => ({
        url: `/collections/delete/${_id}`,
        method: 'POST',
      }),
    }),

    updateCollection: build.mutation<Collection, { _id: string; body: any }>({
      query: (data) => ({
        url: `/collections/update/${data._id}`,
        method: 'POST',
        body: data.body,
      }),
    }),

    addCollection: build.mutation<Collection, any>({
      query: (body) => ({
        url: '/collections/add/',
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
  }),
})

export const {
  useGetCollectionsQuery,
  useGetCollectionByIdQuery,
  useAddCollectionMutation,
  useGetBiggestQuery,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
  useSearchQuery,
} = collectionsApi
