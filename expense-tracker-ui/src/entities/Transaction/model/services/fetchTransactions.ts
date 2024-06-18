import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { RecordsPageTransactionDto, TransactionsResponseDto } from '../types/transaction';

export const fetchTransactions = createAsyncThunk<
TransactionsResponseDto,
RecordsPageTransactionDto,
ThunkConfig<string>
>(
  'transactions/fetchTransactions',
  async (params, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.get<TransactionsResponseDto>(
        '/transactions',
        { params }
      );

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
