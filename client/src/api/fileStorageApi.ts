import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const fileStorageApi = createApi({
  reducerPath: 'fileStorageApi',
  tagTypes: ['FileStorage'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_STORAGE_SERVER_URL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    addImage: build.mutation({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useAddImageMutation } = fileStorageApi
