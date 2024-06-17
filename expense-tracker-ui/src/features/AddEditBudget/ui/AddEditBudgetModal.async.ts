import { FC, lazy } from 'react';
import { AddEditBudgetModalProps } from './AddEditBudgetModal';

export const AddEditBudgetModalAsync = lazy<FC<AddEditBudgetModalProps>>(async () => await import('./AddEditBudgetModal'));
