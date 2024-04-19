import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { editTransaction } from '../services/editTransaction';
import { EditTransactionSchema } from '../types/editTransactionSchema';
import { CurrencyCode } from 'shared/const/common';
import { TransactionType } from 'entities/Transaction';

const initialState: EditTransactionSchema = {
  date: null,
  walletId: '',
  categoryId: '',
  type: null,
  description: '',
  amount: 0,
  currency: CurrencyCode.USD,
  isLoading: false
};

export const editTransactionSlice = createSlice({
  name: 'editTransaction',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setCurrency: (state, action: PayloadAction<CurrencyCode>) => {
      state.currency = action.payload;
    },
    setWalletId: (state, action: PayloadAction<string>) => {
      state.walletId = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },
    setType: (state, action: PayloadAction<TransactionType>) => {
      state.type = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(editTransaction.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: editTransactionActions } = editTransactionSlice;
export const { reducer: editTransactionReducer } = editTransactionSlice;
