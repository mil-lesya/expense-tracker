import { createSlice } from '@reduxjs/toolkit';
import { deleteWallet } from '../services/deleteWallet';
import { DeleteWalletSchema } from '../types/deleteWalletSchema';

const initialState: DeleteWalletSchema = {
  isLoading: false
};

export const deleteWalletSlice = createSlice({
  name: 'deleteWallet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteWallet.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(deleteWallet.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: deleteWalletActions } = deleteWalletSlice;
export const { reducer: deleteWalletReducer } = deleteWalletSlice;
