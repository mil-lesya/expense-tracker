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
      const response = await extra.get<ReportsResponseDto>('/transactions/analytic', { params });

      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
