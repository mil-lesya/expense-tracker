import { StateSchema } from 'app/providers/StoreProvider';

export const getDeleteBudgetIsLoading = (state: StateSchema) => state.deleteBudget?.isLoading;
export const getDeleteBudgetError = (state: StateSchema) => state.deleteBudget?.error;
