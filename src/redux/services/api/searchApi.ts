import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store.ts';

export const searchApi = createApi({
  reducerPath: 'searchApi',
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
    searchHistograms: builder.mutation<unknown, unknown>({
      query: (body) => ({
        url: import.meta.env.VITE_SEARCH_HISTOGRAMS,
        method: 'POST',
        body,
      }),
    }),
    search: builder.mutation<unknown, unknown>({
      query: (body) => ({
        url: import.meta.env.VITE_SEARCH,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSearchHistogramsMutation, useSearchMutation } = searchApi;
