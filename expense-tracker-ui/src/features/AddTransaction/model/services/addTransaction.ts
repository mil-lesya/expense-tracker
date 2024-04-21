import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AddTransactionDto } from '../types/addTransactionSchema';
import { Transaction, fetchTransactions } from 'entities/Transaction';
import { addCategory, fetchCategory } from 'entities/Category';
import { fetchWallets } from 'entities/Wallet';

export const addTransaction = createAsyncThunk<
Transaction,
AddTransactionDto,
ThunkConfig<string>
>(
  'addTransaction/addTransaction',
  async ({ category, ...requestBody }, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      let request = requestBody;

      if (category) {
        const categoryResponse = await dispatch(addCategory(category)).unwrap();
        if (!categoryResponse.id) {
          throw new Error('Category creation failed');
        }
        request = { ...requestBody, categoryId: categoryResponse.id };
      }

      const transactionResponse = await extra.api.post<Transaction>('/transactions', request);
      if (!transactionResponse.data) {
        throw new Error('Failed to add transaction');
      }

      await dispatch(fetchTransactions({ page: 1, limit: 10 }));
      await dispatch(fetchCategory());
      await dispatch(fetchWallets({}));
      return transactionResponse.data;
    } catch (e) {
      return rejectWithValue(e.message || 'Unknown error');
    }
  }
);
