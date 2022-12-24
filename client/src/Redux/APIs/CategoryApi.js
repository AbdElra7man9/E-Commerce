import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = process.env.REACT_APP_API_KEY;

export const CategoryApi = createApi({
    reducerPath: 'CategoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => '/api/category/get',
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Category', id })), 'Category']
                    : ['Category'],
        }),
        getCategoryDetails: builder.query({
            query: (id) => `/api/category/get/${id}`,
            // providesTags: ['Category'],
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: '/api/Category/new',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Category'],
        }),
        updateCategory: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/category/update/${id}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/api/category/delete/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Category', id: arg.id }],
        }),
    }),
});

export const {
    useCreateCategoryMutation,
    useGetCategoryQuery,
    useGetCategoryDetailsQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = CategoryApi;