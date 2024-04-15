import { FC, lazy } from 'react';
import { AddEditWalletModalProps } from './AddEditWalletModal';

export const AddEditWalletModalAsync = lazy<FC<AddEditWalletModalProps>>(async () => await import('./AddEditWalletModal'));
