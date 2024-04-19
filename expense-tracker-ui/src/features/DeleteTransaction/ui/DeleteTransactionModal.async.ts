import { FC, lazy } from 'react';
import { DeleteTransactionModalProps } from './DeleteTransactionModal';

export const DeleteTransactionModalAsync = lazy<FC<DeleteTransactionModalProps>>(async () => await import('./DeleteTransactionModal'));
