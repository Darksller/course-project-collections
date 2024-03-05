import { Tag } from '@/schemas/dbSchemas'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  tagTypes: ['Tags'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    getTags: build.query<Tag[], void>({
      query: () => 'tags',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Tags' as const,
                _id,
              })),
              { type: 'Tags', id: 'LIST' },
            ]
          : [{ type: 'Tags', id: 'LIST' }],
    }),
  }),
})

export const { useGetTagsQuery } = tagsApi
