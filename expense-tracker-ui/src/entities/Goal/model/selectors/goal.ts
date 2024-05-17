import { StateSchema } from 'app/providers/StoreProvider';

export const getGoalsIsLoading = (state: StateSchema) => state.goals?.isLoading;
export const getGoalsError = (state: StateSchema) => state.goals?.error;
export const getGoalsCount = (state: StateSchema) => state.goals?.count;
export const getGoalsCurrentPage = (state: StateSchema) => state.goals?.currentPage;
export const getGoalsTotalPages = (state: StateSchema) => state.goals?.totalPages;
export const getGoalsCompleted = (state: StateSchema) => state.goals?.completed;
export const getGoalsLimit = (state: StateSchema) => state.goals?.limit;
export const getGoalsEntities = (state: StateSchema) => state.goals?.entities;
