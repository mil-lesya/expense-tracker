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
      const response = await extra.api.get<CategoryResponseDto>('/categories', { params: { page: 1, limit: 100 } });

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
