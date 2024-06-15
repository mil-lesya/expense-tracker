import { StateSchema } from 'app/providers/StoreProvider';

export const getAddEditLimitIsLoading = (state: StateSchema) => state.addEditLimit?.isLoading;
export const getAddEditLimitError = (state: StateSchema) => state.addEditLimit?.error;
export const getAddEditLimitAmount = (state: StateSchema) => state.addEditLimit?.amount;
export const getAddEditLimitCategory = (state: StateSchema) => state.addEditLimit?.categoryId;
