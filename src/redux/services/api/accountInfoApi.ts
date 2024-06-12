import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AccInfoResponse } from '../../../types.ts';
import { RootState } from '../../store.ts';

export const accountInfoApi = createApi({
  reducerPath: 'accountInfoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.authReducer.accessToken;

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getAccountInfo: builder.query<AccInfoResponse, unknown>({
      query: () => ({
        url: import.meta.env.VITE_ACCOUNT_INFO,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAccountInfoQuery } = accountInfoApi;
