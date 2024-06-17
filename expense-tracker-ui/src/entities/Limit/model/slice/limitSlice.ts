import {
  createEntityAdapter,
  createSlice, PayloadAction
} from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';
import { Limit, LimitSchema, LimitsResponseDto } from '../types/limit';
import { fetchLimits } from '../services/fetchLimits';

const limitsAdapter = createEntityAdapter<Limit>({
  selectId: (limit) => limit.id
});

export const getUserLimits = limitsAdapter.getSelectors<StateSchema>(
  (state) => state.limits || limitsAdapter.getInitialState()
);

const limitsSlice = createSlice({
  name: 'limitsSlice',
  initialState: limitsAdapter.getInitialState<LimitSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {}
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLimits.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchLimits.fulfilled, (
        state,
        action: PayloadAction<LimitsResponseDto>
      ) => {
        state.isLoading = false;
        limitsAdapter.setAll(state, action.payload.limits);
      })
      .addCase(fetchLimits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { reducer: limitsReducer } = limitsSlice;
