import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User } from 'entities/User';

export const confirm = createAsyncThunk<
User,
string,
ThunkConfig<string>
>(
  'confirm',
  async (token, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.get<User>('/auth/confirm', { params: { token } });

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
