import { FC, lazy } from 'react';
import { ForgetPasswordFormProps } from './ForgetPasswordForm';

export const ForgetPasswordFormAsync = lazy<FC<ForgetPasswordFormProps>>(async () => await import('./ForgetPasswordForm'));
