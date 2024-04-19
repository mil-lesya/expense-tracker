import {
  createEntityAdapter,
  createSlice, PayloadAction
} from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';
import { fetchCategory } from '../services/fetchCategory';
import { Category, CategoryResponseDto, CategorySchema } from '../types/category';

const categoryAdapter = createEntityAdapter<Category>({
  selectId: (transaction) => transaction.id
});

export const getUserCategories = categoryAdapter.getSelectors<StateSchema>(
  (state) => state.category || categoryAdapter.getInitialState()
);

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState: categoryAdapter.getInitialState<CategorySchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {}
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchCategory.fulfilled, (
        state,
        action: PayloadAction<CategoryResponseDto>
      ) => {
        state.isLoading = false;
        categoryAdapter.setAll(state, action.payload.categories);
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { reducer: categoryReducer } = categorySlice;
