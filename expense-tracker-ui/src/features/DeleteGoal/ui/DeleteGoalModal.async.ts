import { FC, lazy } from 'react';
import { DeleteGoalModalProps } from './DeleteGoalModal';

export const DeleteGoalModalAsync = lazy<FC<DeleteGoalModalProps>>(async () => await import('./DeleteGoalModal'));
