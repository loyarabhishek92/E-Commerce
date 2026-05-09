import { mainApi } from "@/app/mainApi.js";

export const orderApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({


        getOrder: builder.query({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),

        getOrders: builder.query({
            query: (q) => ({
                url: '/orders',
                method: 'GET',
                headers: { authorization: q },
            }),
            providesTags: ['Order'],
        }),

        createOrder: builder.mutation({
            query: (q) => ({
                url: '/orders',
                body: q.data,
                headers: { authorization: q.token },
                method: 'POST',
            }),
            invalidatesTags: ['Order']
        }),
    }),
});


export const { useCreateOrderMutation, useGetOrdersQuery, useGetOrderQuery } = orderApi;