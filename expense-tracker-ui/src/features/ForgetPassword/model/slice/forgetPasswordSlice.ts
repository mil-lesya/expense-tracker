import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type ForgetPasswordSchema } from '../types/forgetPasswordSchema';
import { forgetPassword } from '../services/forgetPassword';

const initialState: ForgetPasswordSchema = {
  isLoading: false,
  email: ''
};

export const forgetPasswordSlice = createSlice({
  name: 'forgetPassword',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: forgetPasswordActions } = forgetPasswordSlice;
export const { reducer: forgetPasswordReducer } = forgetPasswordSlice;
