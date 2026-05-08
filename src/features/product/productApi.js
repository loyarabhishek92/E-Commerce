import { mainApi } from "@/app/mainApi.js";

const productApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        getProducts: builder.query({
            query: (params) => ({
                url: '/products',
                method: 'GET',
                params
            }),
            providesTags: ['Product'],
        }),

        getProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),

        addProduct: builder.mutation({
            query: (q) => ({
                url: '/products',
                method: 'POST',
                body: q.body,
                headers: {Authorization: q.token},
            }),
            invalidatesTags: ['Product'],
        }),

        updateProduct: builder.mutation({
            query: (q) => ({
                url: `/products/${q.id}`,
                method: 'PATCH',
                body: q.body,
                headers: {Authorization: q.token},
            }),
            invalidatesTags: ['Product'],
        }),

        removeProduct: builder.mutation({
            query: (q) => ({
                url: `/products/${q.id}`,
                method: 'DELETE',
                headers: {Authorization: q.token},
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const {useGetProductsQuery, useGetProductQuery, useAddProductMutation, useUpdateProductMutation, useRemoveProductMutation} = productApi;