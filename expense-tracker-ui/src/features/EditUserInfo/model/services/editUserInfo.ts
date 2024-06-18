import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { EditUserInfoDto } from '../types/editUserInfoSchema';
import { User, userActions } from 'entities/User';

export const editUserInfo = createAsyncThunk<
User,
EditUserInfoDto,
ThunkConfig<string>
>(
  'editUserInfo/edit',
  async ({ id, ...requestBody }, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await extra.patch<User>(`/users/${id}`, requestBody);

      dispatch(userActions.setAuthData(response));

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
