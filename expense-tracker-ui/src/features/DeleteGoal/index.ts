import { deleteGoalReducer } from './model/slice/deleteGoalSlice';
import { DeleteGoalSchema } from './model/types/deleteGoalSchema';
import { DeleteGoalModalAsync } from './ui/DeleteGoalModal.async';

export { DeleteGoalModalAsync as DeleteGoalModal, deleteGoalReducer, type DeleteGoalSchema };
