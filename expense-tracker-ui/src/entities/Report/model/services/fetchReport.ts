import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ReportsResponseDto, RecordsPageReportDto } from '../types/report';

export const fetchReport = createAsyncThunk<
ReportsResponseDto,
RecordsPageReportDto,
ThunkConfig<string>
>(
  'reports/fetchReport',
  async (params, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.get<ReportsResponseDto>('/transactions/analytic', { params });

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
