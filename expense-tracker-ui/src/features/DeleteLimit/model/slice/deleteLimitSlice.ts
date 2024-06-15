import { createSlice } from '@reduxjs/toolkit';
import { deleteLimit } from '../services/deleteLimit';
import { DeleteLimitSchema } from '../types/deleteLimitSchema';

const initialState: DeleteLimitSchema = {
  isLoading: false
};

export const deleteLimitSlice = createSlice({
  name: 'deleteLimit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteLimit.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(deleteLimit.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteLimit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: deleteLimitActions } = deleteLimitSlice;
export const { reducer: deleteLimitReducer } = deleteLimitSlice;
