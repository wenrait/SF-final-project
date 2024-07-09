import { configureStore } from '@reduxjs/toolkit';
import { accountLoginApi } from './services/api/accountLoginApi.ts';
import { authSlice } from './slices/authSlice.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { accountInfoApi } from './services/api/accountInfoApi.ts';
import { searchApi } from './services/api/searchApi.ts';
import {searchSlice} from "./slices/searchSlice.ts";

export const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    searchReducer: searchSlice.reducer,
    [accountLoginApi.reducerPath]: accountLoginApi.reducer,
    [accountInfoApi.reducerPath]: accountInfoApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(accountLoginApi.middleware)
      .concat(accountInfoApi.middleware)
      .concat(searchApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
