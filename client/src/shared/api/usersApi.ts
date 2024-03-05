import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserPayload } from '../../api/types/dto/UserPayload'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    getMe: build.query<UserPayload, void>({
      query: () => '/users/getMe/',
    }),
  }),
})

export const { useLazyGetMeQuery } = usersApi
