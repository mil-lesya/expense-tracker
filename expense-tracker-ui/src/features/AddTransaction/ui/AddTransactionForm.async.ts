import { FC, lazy } from 'react';
import { AddTransactionFormProps } from './AddTransactionForm';

export const AddTransactionFormAsync = lazy<FC<AddTransactionFormProps>>(async () => await import('./AddTransactionForm'));
