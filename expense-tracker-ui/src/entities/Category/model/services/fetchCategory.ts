import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { CategoryResponseDto } from '../types/category';

export const fetchCategory = createAsyncThunk<
CategoryResponseDto,
null,
ThunkConfig<string>
>(
  'category/fetchCategory',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.get<CategoryResponseDto>('/categories', { params: { page: 1, limit: 100 } });

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
