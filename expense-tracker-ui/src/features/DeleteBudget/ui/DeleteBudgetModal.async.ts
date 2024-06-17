import { FC, lazy } from 'react';
import { DeleteBudgetModalProps } from './DeleteBudgetModal';

export const DeleteBudgetModalAsync = lazy<FC<DeleteBudgetModalProps>>(async () => await import('./DeleteBudgetModal'));
