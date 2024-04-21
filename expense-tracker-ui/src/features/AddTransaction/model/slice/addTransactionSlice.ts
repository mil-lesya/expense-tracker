import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addTransaction } from '../services/addTransaction';
import { AddTransactionSchema } from '../types/addTransactionSchema';
import { CurrencyCode } from 'shared/const/common';
import { TransactionType } from 'entities/Transaction';

const initialState: AddTransactionSchema = {
  date: new Date().toISOString(),
  walletId: '',
  categoryId: '',
  type: 'expense',
  description: '',
  amount: null,
  currency: CurrencyCode.USD,
  isLoading: false
};

export const addTransactionSlice = createSlice({
  name: 'addTransaction',
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
      .addCase(addTransaction.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: addTransactionActions } = addTransactionSlice;
export const { reducer: addTransactionReducer } = addTransactionSlice;
