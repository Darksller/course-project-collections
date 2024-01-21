import { Collection } from '@/pages/Collections'
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
    getCollectionById: build.query<Collection, string>({
      query: (_id) => `collections/${_id}`,
    }),
  }),
})

export const { useGetCollectionsQuery } = collectionsApi
