import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";


// export const base = 'http://192.168.18.24:5000';
export const base = 'https://e-commerce-m4xn.onrender.com';

export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://e-commerce-m4xn.onrender.com/api'
    }),
    endpoints: (builder) => ({}),
});