import { FC, lazy } from 'react';
import { DeleteLimitModalProps } from './DeleteLimitModal';

export const DeleteLimitModalAsync = lazy<FC<DeleteLimitModalProps>>(async () => await import('./DeleteLimitModal'));
