import { FC, lazy } from 'react';
import { DeleteWalletModalProps } from './DeleteWalletModal';

export const DeleteWalletModalAsync = lazy<FC<DeleteWalletModalProps>>(async () => await import('./DeleteWalletModal'));
