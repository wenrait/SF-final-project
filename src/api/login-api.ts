import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginReq, LoginRes } from '../types.ts';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gateway.scan-interfax.ru/api/v1/',
  }),
  endpoints: (builder) => ({
    postAuthData: builder.mutation<LoginRes, LoginReq>({
      query: (body) => ({
        url: 'account/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { usePostAuthDataMutation } = loginApi;
