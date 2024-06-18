import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';
import { initAuthData } from '../services/initAuthData';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';

const initialState: UserSchema = {
  isAuth: false,
  isReg: false,
  isLoading: true
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
    setIsReg: (state, action: PayloadAction<boolean>) => {
      state.isReg = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.authData = undefined;
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initAuthData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initAuthData.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(initAuthData.rejected, (state, action) => {
        state.isLoading = false;
      });
  }
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
