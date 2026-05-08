import { mainApi } from "@/app/mainApi.js";

const userApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        getUser: builder.query({
            query: (token) => ({
                url: '/user/profile',
                method: 'GET',
                headers: {Authorization: token},
            }),
            providesTags: ['User'],
        }),

        updateUser: builder.mutation({
            query: (q) => ({
                url: '/user/profile',
                method: 'PATCH',
                body: q.body,
                headers: {Authorization: q.token},
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {useGetUserQuery, useUpdateUserMutation} = userApi;