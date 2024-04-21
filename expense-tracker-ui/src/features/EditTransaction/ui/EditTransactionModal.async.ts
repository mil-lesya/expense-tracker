import { FC, lazy } from 'react';
import { EditTransactionModalProps } from './EditTransactionModal';

export const EditTransactionModalAsync = lazy<FC<EditTransactionModalProps>>(async () => await import('./EditTransactionModal'));
