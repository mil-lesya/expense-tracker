import {
  createEntityAdapter,
  createSlice, PayloadAction
} from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';
import { fetchTransactions } from '../services/fetchTransactions';
import { Transaction, TransactionSchema, TransactionsResponseDto } from '../types/transaction';

const transactionsAdapter = createEntityAdapter<Transaction>({
  selectId: (transaction) => transaction.id
});

export const getUserTransactions = transactionsAdapter.getSelectors<StateSchema>(
  (state) => state.transactions || transactionsAdapter.getInitialState()
);

const transactionsSlice = createSlice({
  name: 'transactionsSlice',
  initialState: transactionsAdapter.getInitialState<TransactionSchema>({
    isLoading: false,
    error: undefined,
    currentPage: 1,
    limit: 10,
    ids: [],
    entities: {}
  }),
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (
        state,
        action: PayloadAction<TransactionsResponseDto>
      ) => {
        state.isLoading = false;
        transactionsAdapter.setAll(state, action.payload.transactions);
        state.count = action.payload.count;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { reducer: transactionsReducer } = transactionsSlice;
export const { actions: transactionsActions } = transactionsSlice;
