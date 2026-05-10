import { mainApi } from "@/app/mainApi.js";

const authApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        register: builder.mutation({
            query: (credentials) => ({
                url: '/user/register',
                method: 'POST',
                body: credentials.body,
            }),
            invalidatesTags: ['Register'],
        }),

        login: builder.mutation({
            query: (credentials) => ({
                url: '/user/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});


export const { useRegisterMutation, useLoginMutation } = authApi;