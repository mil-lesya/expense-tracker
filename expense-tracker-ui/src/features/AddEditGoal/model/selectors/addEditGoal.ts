import { StateSchema } from 'app/providers/StoreProvider';

export const getAddEditGoalIsLoading = (state: StateSchema) => state.addEditGoal?.isLoading;
export const getAddEditGoalError = (state: StateSchema) => state.addEditGoal?.error;
export const getAddEditGoalName = (state: StateSchema) => state.addEditGoal?.name;
export const getAddEditGoalCurrency = (state: StateSchema) => state.addEditGoal?.currency;
export const getAddEditGoalAmount = (state: StateSchema) => state.addEditGoal?.goalAmount;
export const getAddEditGoalDepositedAmount = (state: StateSchema) => state.addEditGoal?.depositedAmount;
export const getAddEditGoalTargetDate = (state: StateSchema) => state.addEditGoal?.targetDate;
export const getAddEditGoalImage = (state: StateSchema) => state.addEditGoal?.image;
export const getAddEditGoalIsCompleted = (state: StateSchema) => state.addEditGoal?.isCompleted;
