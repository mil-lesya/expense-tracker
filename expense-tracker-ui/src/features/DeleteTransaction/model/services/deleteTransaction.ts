import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { DeleteTransactionDto } from '../types/deleteTransactionSchema';
import { Transaction, fetchTransactions } from 'entities/Transaction';

export const deleteTransaction = createAsyncThunk<
Transaction,
DeleteTransactionDto,
ThunkConfig<string>
>(
  'deleteWallet/deleteWallet',
  async ({ id, currentPage, limit }, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await extra.delete<Transaction>(`/transactions/${id}`);

      dispatch(fetchTransactions({ page: currentPage, limit }));

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
