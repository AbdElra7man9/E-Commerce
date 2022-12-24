import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = process.env.REACT_APP_API_KEY;

export const BrandApi = createApi({
    reducerPath: 'BrandApi',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    tagTypes: ['Brand'],
    endpoints: (builder) => ({
        getBrand: builder.query({
            query: () => '/api/brand/get',
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Brand', id })), 'Brand']
                    : ['Brand'],
        }),
        getBrandDetails: builder.query({
            query: (id) => `/api/brand/get/${id}`,
            keepUnusedDataFor: 5,
            // providesTags: ['Brand'],
        }),
        createBrand: builder.mutation({
            query: (data) => ({
                url: '/api/brand/new',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Brand'],
        }),
        updateBrand: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/brand/update/${id}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Brand'],
        }),
        deleteBrand: builder.mutation({
            query: (id) => ({
                url: `/api/brand/delete/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Brand', id: arg.id }],
        }),
    }),
});

export const {
    useCreateBrandMutation,
    useGetBrandQuery,
    useGetBrandDetailsQuery,
    useUpdateBrandMutation,
    useDeleteBrandMutation,
} = BrandApi;
