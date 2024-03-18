import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';
import { initAuthData } from '../services/initAuthData';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';

const initialState: UserSchema = {
  isAuth: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.authData = undefined;
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initAuthData.pending, (state) => {})
      .addCase(initAuthData.fulfilled, (state, action) => {})
      .addCase(initAuthData.rejected, (state, action) => {});
  }
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
