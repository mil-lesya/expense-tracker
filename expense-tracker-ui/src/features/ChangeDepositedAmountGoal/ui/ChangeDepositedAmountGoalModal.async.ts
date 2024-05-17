import { FC, lazy } from 'react';
import { ChangeDepositedAmountGoalModalProps } from './ChangeDepositedAmountGoalModal';

export const ChangeDepositedAmountGoalModalAsync = lazy<FC<ChangeDepositedAmountGoalModalProps>>(async () => await import('./ChangeDepositedAmountGoalModal'));
