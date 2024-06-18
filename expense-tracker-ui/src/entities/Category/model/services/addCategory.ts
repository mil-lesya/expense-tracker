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
      const response = await extra.post<Category>('/categories', category);

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
