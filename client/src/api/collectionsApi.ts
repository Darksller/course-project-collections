import { Collection } from '@/schemas/dbSchemas'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const collectionsApi = createApi({
  reducerPath: 'collectionsApi',
  tagTypes: ['Collections'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
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

    addCollection: build.mutation<Collection, any>({
      query: (body) => ({
        url: '/collections/add/',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetCollectionsQuery,
  useGetCollectionByIdQuery,
  useAddCollectionMutation,
  useGetBiggestQuery,
} = collectionsApi
