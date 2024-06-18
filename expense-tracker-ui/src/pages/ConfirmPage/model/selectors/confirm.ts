import { StateSchema } from 'app/providers/StoreProvider';

export const getConfirmIsLoading = (state: StateSchema) => state.confirm?.isLoading;
export const getConfirmError = (state: StateSchema) => state.confirm?.error;
