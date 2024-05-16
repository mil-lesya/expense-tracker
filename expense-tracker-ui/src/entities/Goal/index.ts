import { getGoalsCompleted, getGoalsIsLoading, getGoalsError, getGoalsCount, getGoalsCurrentPage, getGoalsLimit, getGoalsTotalPages } from './model/selectors/goal';
import { fetchGoals } from './model/services/fetchGoals';
import { getUserGoals, goalsActions, goalsReducer } from './model/slice/goalSlice';
import { Goal, GoalSchema } from './model/types/goal';
import GoalsList from './ui/GoalsList/GoalsList';

export { type GoalSchema, type Goal };
export { GoalsList };
export { fetchGoals };
export { getGoalsCompleted, getGoalsIsLoading, getGoalsError, getGoalsCount, getGoalsCurrentPage, getGoalsLimit, getGoalsTotalPages };
export { getUserGoals, goalsReducer, goalsActions };
