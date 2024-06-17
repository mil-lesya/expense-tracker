import { FC, lazy } from 'react';
import { AddEditLimitModalProps } from './AddEditLimitModal';

export const AddEditLimitModalAsync = lazy<FC<AddEditLimitModalProps>>(async () => await import('./AddEditLimitModal'));
