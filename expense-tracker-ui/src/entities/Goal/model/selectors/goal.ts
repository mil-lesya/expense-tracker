import { StateSchema } from 'app/providers/StoreProvider';
import { getUserGoals } from '../slice/goalSlice';
import { Goal } from '../types/goal';

export const getGoalsIsLoading = (state: StateSchema) => state.goals?.isLoading;
export const getGoalsError = (state: StateSchema) => state.goals?.error;
export const getGoalsCount = (state: StateSchema) => state.goals?.count;
export const getGoalsCurrentPage = (state: StateSchema) => state.goals?.currentPage;
export const getGoalsTotalPages = (state: StateSchema) => state.goals?.totalPages;
export const getGoalsEntities = (state: StateSchema) => state.goals?.entities;

export const getWalletsIsCompleted = (state: StateSchema) => {
  const allGoals = getUserGoals.selectAll(state);
  return allGoals.filter((goal: Goal) => goal.isCompleted);
};

export const getWalletsIsActive = (state: StateSchema) => {
  const allGoals = getUserGoals.selectAll(state);
  return allGoals.filter((goal: Goal) => !goal.isCompleted);
};
