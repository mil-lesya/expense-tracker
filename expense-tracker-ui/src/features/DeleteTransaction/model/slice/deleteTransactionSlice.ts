import { createSlice } from '@reduxjs/toolkit';
import { deleteTransaction } from '../services/deleteTransaction';
import { DeleteTransactionSchema } from '../types/deleteTransactionSchema';

const initialState: DeleteTransactionSchema = {
  isLoading: false
};

export const deleteTransactionSlice = createSlice({
  name: 'deleteTransaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTransaction.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: deleteTransactionActions } = deleteTransactionSlice;
export const { reducer: deleteTransactionReducer } = deleteTransactionSlice;
