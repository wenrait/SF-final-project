import { configureStore } from '@reduxjs/toolkit';
import { accountLoginApi } from '../api/accountLoginApi.ts';
import { authSlice } from './authSlice.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { accountInfoApi } from '../api/accountInfoApi.ts';

export const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    [accountLoginApi.reducerPath]: accountLoginApi.reducer,
    [accountInfoApi.reducerPath]: accountInfoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(accountLoginApi.middleware)
      .concat(accountInfoApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
