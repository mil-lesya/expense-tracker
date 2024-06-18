import { createSlice } from '@reduxjs/toolkit';
import { type ConfirmSchema } from '../types/confirmSchema';
import { confirm } from '../services/confirm';

const initialState: ConfirmSchema = {
  isLoading: false
};

export const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(confirm.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(confirm.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(confirm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: confirmActions } = confirmSlice;
export const { reducer: confirmReducer } = confirmSlice;
