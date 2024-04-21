import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Category, CategoryDto } from '../types/category';

export const addCategory = createAsyncThunk<
Category,
CategoryDto,
ThunkConfig<string>
>(
  'category/addCategory',
  async (category, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.post<Category>('/categories', category);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
