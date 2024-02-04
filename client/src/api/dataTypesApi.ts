import { DataType } from '@/schemas/dbSchemas'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const dataTypesApi = createApi({
  reducerPath: 'dataTypesApi',
  tagTypes: ['DataTypes'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    getDataTypes: build.query<DataType[], void>({
      query: () => 'dataTypes',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'DataTypes' as const,
                _id,
              })),
              { type: 'DataTypes', id: 'LIST' },
            ]
          : [{ type: 'DataTypes', id: 'LIST' }],
    }),
  }),
})

export const { useGetDataTypesQuery } = dataTypesApi
