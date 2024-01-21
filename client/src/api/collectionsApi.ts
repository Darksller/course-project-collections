import { Collection } from '@/pages/Collections'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const collectionsApi = createApi({
  reducerPath: 'collectionsApi',
  tagTypes: ['Collections'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9999/' }),
  endpoints: (build) => ({
    getCollections: build.query<CollectionsResponse, void>({
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
  }),
})

export const { useGetCollectionsQuery } = collectionsApi

export type CollectionsResponse = Collection[]
