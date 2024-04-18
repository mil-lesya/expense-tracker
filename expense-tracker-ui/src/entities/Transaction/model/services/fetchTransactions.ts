import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';
import { RecordsPageTransactionDto, TransactionsResponseDto } from '../types/transaction';

export const fetchTransactions = createAsyncThunk<
TransactionsResponseDto,
RecordsPageTransactionDto,
ThunkConfig<string>
>(
  'transactions/fetchTransactions',
  async (params, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      return rejectWithValue('error');
    }

    try {
      const response = await extra.api.get<TransactionsResponseDto>(
        '/transactions',
        { params }
      );

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
