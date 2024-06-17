import { FC, lazy } from 'react';
import { EditUserInfoModalProps } from './EditUserInfoModal';

export const EditUserInfoModalAsync = lazy<FC<EditUserInfoModalProps>>(async () => await import('./EditUserInfoModal'));
