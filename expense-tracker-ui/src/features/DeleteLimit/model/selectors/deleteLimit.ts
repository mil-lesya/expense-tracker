import { StateSchema } from 'app/providers/StoreProvider';

export const getDeleteLimitIsLoading = (state: StateSchema) => state.deleteLimit?.isLoading;
export const getDeleteLimitError = (state: StateSchema) => state.deleteLimit?.error;
