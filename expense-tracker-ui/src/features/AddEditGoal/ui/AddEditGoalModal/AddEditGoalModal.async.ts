import { FC, lazy } from 'react';
import { AddEditGoalModalProps } from './AddEditGoalModal';

export const AddEditGoalModalAsync = lazy<FC<AddEditGoalModalProps>>(async () => await import('./AddEditGoalModal'));
