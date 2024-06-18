import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User } from 'entities/User';
import { ResetPasswordDto } from '../types/resetPasswordSchema';

export const resetPassword = createAsyncThunk<
User,
ResetPasswordDto,
ThunkConfig<string>
>(
  'resetPassword',
  async ({ token, password }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.post<User>(`/auth/reset?token=${token}`, { password });

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
