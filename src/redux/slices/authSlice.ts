import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
  accessToken: string | null;
  expire: Date | null;
  isAuthenticated: boolean;
  tariff?: string;
}

const initialState: IAuthState = {
  accessToken: null,
  expire: null,
  isAuthenticated: false,
};

const getStateFromStorage = (): IAuthState => {
  try {
    const authState = localStorage.getItem('authState');
    if (!authState) {
      return initialState;
    }
    const parsedState = JSON.parse(authState);
    const expireDate = new Date(parsedState.expire).getTime();
    if (Date.now() > expireDate) {
      localStorage.removeItem('authState');
      return initialState;
    }
    return parsedState;
  } catch (e) {
    return initialState;
  }
};

const saveStateToStorage = (state: IAuthState) => {
  try {
    const authState = JSON.stringify(state);
    localStorage.setItem('authState', authState);
  } catch (e) {
    console.log(e);
  }
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: getStateFromStorage(),
  reducers: {
    setAuthData: (state, action: PayloadAction<IAuthState>) => {
      state.accessToken = action.payload.accessToken;
      state.expire = action.payload.expire;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.tariff = action.payload.tariff;
      saveStateToStorage(state);
    },
  },
});

export const { setAuthData } = authSlice.actions;
