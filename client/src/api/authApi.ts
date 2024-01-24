import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['auth'],
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

    refresh: build.mutation<string, RefreshApiType>({
      query: (body) => ({
        url: '/auth/refresh',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi

type RefreshApiType = {
  authToken?: string | undefined
  refreshToken?: string | undefined
  authUserState: object | null
}
