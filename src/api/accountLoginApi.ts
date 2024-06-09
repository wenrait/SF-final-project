import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginReq, LoginRes } from '../types.ts';

export const accountLoginApi = createApi({
  reducerPath: 'accountLoginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    postAuthData: builder.mutation<LoginRes, LoginReq>({
      query: (body) => ({
        url: import.meta.env.VITE_ACCOUNT_LOGIN,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { usePostAuthDataMutation } = accountLoginApi;
