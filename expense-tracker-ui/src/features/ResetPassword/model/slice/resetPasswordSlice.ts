import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type ResetPasswordSchema } from '../types/resetPasswordSchema';
import { resetPassword } from '../services/resetPassword';

const initialState: ResetPasswordSchema = {
  isLoading: false,
  password: ''
};

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: resetPasswordActions } = resetPasswordSlice;
export const { reducer: resetPasswordReducer } = resetPasswordSlice;
