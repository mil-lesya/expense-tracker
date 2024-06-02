import { StateSchema } from 'app/providers/StoreProvider';

export const getBudgetsIsLoading = (state: StateSchema) => state.budgets?.isLoading;
export const getBudgetsError = (state: StateSchema) => state.budgets?.error;
