import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store.ts';
import { ISearchState } from '../../slices/searchSlice.ts';
import { DocumentsReq, DocumentsRes, SearchHistogramsRes, SearchRes } from '../../../types.ts';

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
    searchHistograms: builder.mutation<SearchHistogramsRes, ISearchState>({
      query: (body) => ({
        url: import.meta.env.VITE_SEARCH_HISTOGRAMS,
        method: 'POST',
        body,
      }),
    }),
    search: builder.mutation<SearchRes, ISearchState>({
      query: (body) => ({
        url: import.meta.env.VITE_SEARCH,
        method: 'POST',
        body,
      }),
    }),
    searchDocuments: builder.mutation<DocumentsRes[], DocumentsReq>({
      query: (body) => ({
        url: import.meta.env.VITE_DOCUMENTS,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSearchHistogramsMutation, useSearchMutation, useSearchDocumentsMutation } = searchApi;
