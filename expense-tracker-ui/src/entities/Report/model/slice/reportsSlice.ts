import {
  createEntityAdapter,
  createSlice, PayloadAction
} from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';
import { fetchReport } from '../services/fetchReport';
import { Report, ReportsResponseDto, ReportSchema, ReportType, Period } from '../types/report';
import dayjs from 'dayjs';

const reportsAdapter = createEntityAdapter<Report>({
  selectId: (report) => report.category.id
});

export const getUserReports = reportsAdapter.getSelectors<StateSchema>(
  (state) => state.reports || reportsAdapter.getInitialState()
);

const reportsSlice = createSlice({
  name: 'reportsSlice',
  initialState: reportsAdapter.getInitialState<ReportSchema>({
    isLoading: false,
    error: undefined,
    type: 'expense',
    period: { startDate: dayjs().startOf('month').toISOString(), endDate: dayjs().toISOString() },
    ids: [],
    entities: {}
  }),
  reducers: {
    setType: (state, action: PayloadAction<ReportType>) => {
      state.type = action.payload;
    },
    setPeriod: (state, action: PayloadAction<Period>) => {
      state.period = action.payload;
    },
    setWallets: (state, action: PayloadAction<string>) => {
      state.wallets = action.payload;
    },
    setCategories: (state, action: PayloadAction<string>) => {
      state.categories = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReport.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchReport.fulfilled, (
        state,
        action: PayloadAction<ReportsResponseDto>
      ) => {
        state.isLoading = false;
        reportsAdapter.setAll(state, action.payload.analytic);
        state.totalBalance = action.payload.totalBalance;
        state.currency = action.payload.currency;
      })
      .addCase(fetchReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { reducer: reportsReducer } = reportsSlice;
export const { actions: reportsActions } = reportsSlice;
