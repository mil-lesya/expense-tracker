import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { EditTransactionDto } from '../types/editTransactionSchema';
import { Transaction, fetchTransactions } from 'entities/Transaction';

export const editTransaction = createAsyncThunk<
Transaction,
EditTransactionDto,
ThunkConfig<string>
>(
  'deleteWallet/deleteWallet',
  async ({ id, currentPage, limit, ...requestBody }, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await extra.api.patch<Transaction>(`/transactions/${id}`, requestBody);

      if (!response.data) {
        throw new Error();
      }

      dispatch(fetchTransactions({ page: currentPage, limit }));

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
