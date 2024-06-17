import { StateSchema } from 'app/providers/StoreProvider';

export const getBudgetsIsLoading = (state: StateSchema) => state.limits?.isLoading;
export const getBudgetsError = (state: StateSchema) => state.limits?.error;
