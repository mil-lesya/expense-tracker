import { StateSchema } from 'app/providers/StoreProvider';

export const getChangeDepositedAmountGoalIsLoading = (state: StateSchema) => state.changeDepositedAmountGoal?.isLoading;
export const getChangeDepositedAmountGoalError = (state: StateSchema) => state.changeDepositedAmountGoal?.error;
export const getChangeDepositedAmountGoalDepositedAmount = (state: StateSchema) => state.changeDepositedAmountGoal?.depositedAmount;
