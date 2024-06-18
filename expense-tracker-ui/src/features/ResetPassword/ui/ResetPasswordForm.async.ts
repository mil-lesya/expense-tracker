import { FC, lazy } from 'react';
import { ResetPasswordFormProps } from './ResetPasswordForm';

export const ResetPasswordFormAsync = lazy<FC<ResetPasswordFormProps>>(async () => await import('./ResetPasswordForm'));
