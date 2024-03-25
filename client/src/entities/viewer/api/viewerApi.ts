import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserPayload } from '../types/UserPayload'

export const viewerApi = createApi({
  reducerPath: 'viewerApi',
  tagTypes: ['viewer'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),

    login: build.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),

    refresh: build.mutation({
      query: (body) => ({
        url: '/auth/refresh',
        method: 'POST',
        body,
      }),
    }),

    fetchMe: build.query<UserPayload, void>({
      query: () => '/users/fetchMe/',
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLazyFetchMeQuery } =
  viewerApi
