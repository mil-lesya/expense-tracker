import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AddTransactionDto } from '../types/addTransactionSchema';
import { Transaction, fetchTransactions } from 'entities/Transaction';

export const addTransaction = createAsyncThunk<
Transaction,
AddTransactionDto,
ThunkConfig<string>
>(
  'deleteWallet/deleteWallet',
  async (requestBody, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await extra.api.post<Transaction>('/transactions', requestBody);

      if (!response.data) {
        throw new Error();
      }

      dispatch(fetchTransactions({ page: 1, limit: 10, order: 'ASC' }));

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
