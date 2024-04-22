import { StateSchema } from 'app/providers/StoreProvider';

export const getCategoriesIsLoading = (state: StateSchema) => state.category?.isLoading;
