import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
  accessToken: string | null;
  expire: Date | null;
}

const initialState: IAuthState = {
  accessToken: null,
  expire: null,
};

const getStateFromStorage = (): IAuthState => {
  try {
    const authState = localStorage.getItem('authState');
    if (!authState) {
      return initialState;
    }
    return JSON.parse(authState);
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
      saveStateToStorage(state);
    },
  },
});

export const { setAuthData } = authSlice.actions;
