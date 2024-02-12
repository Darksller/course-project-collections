import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserPayload } from './types/dto/UserPayload'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    getUserByAccessToken: build.query<UserPayload, string>({
      query: (accessToken) => `/users/getUserByAccessToken/${accessToken}`,
    }),

    likeCollection: build.mutation<
      boolean,
      { _id: string; collectionId: string }
    >({
      query: (data) => ({
        url: `/users/likeCollection/${data._id}`,
        method: 'PATCH',
        body: { collectionId: data.collectionId },
      }),
    }),

    isCollectionLiked: build.mutation<
      boolean,
      { _id: string; collectionId: string }
    >({
      query: (data) => ({
        url: `/users/isCollectionLiked/${data._id}`,
        method: 'POST',
        body: { collectionId: data.collectionId },
      }),
    }),
  }),
})

export const {
  useLikeCollectionMutation,
  useIsCollectionLikedMutation,
  useLazyGetUserByAccessTokenQuery,
} = usersApi
