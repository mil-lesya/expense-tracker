import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User } from 'entities/User';

export const forgetPassword = createAsyncThunk<
User,
string,
ThunkConfig<string>
>(
  'forgetPassword',
  async (email, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.post<User>('/auth/forgot', { email });

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
