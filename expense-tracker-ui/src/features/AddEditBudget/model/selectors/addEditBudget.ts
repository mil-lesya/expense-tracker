import { StateSchema } from 'app/providers/StoreProvider';

export const getAddEditBudgetIsLoading = (state: StateSchema) => state.addEditBudget?.isLoading;
export const getAddEditBudgetError = (state: StateSchema) => state.addEditBudget?.error;
export const getAddEditBudgetAmount = (state: StateSchema) => state.addEditBudget?.amount;
export const getAddEditBudgetName = (state: StateSchema) => state.addEditBudget?.name;
export const getAddEditBudgetPeriod = (state: StateSchema) => state.addEditBudget?.period;
