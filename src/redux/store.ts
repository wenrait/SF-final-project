import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from '../api/login-api.ts';
import { authSlice } from './authSlice.ts';

export const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware),
});
