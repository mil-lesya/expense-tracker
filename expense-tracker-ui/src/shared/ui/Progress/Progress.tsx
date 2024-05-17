import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Progress.module.scss';
import { CurrencyCode } from 'shared/const/common';

export enum ThemeProgress {
  LIGHT = 'light',
  DARK = 'dark',
  DARK_MINI = 'darkMini',
}

interface ProgressProps {
  className?: string
  current: number
  total: number
  currency: CurrencyCode
  theme?: ThemeProgress
}

const Progress: FC<ProgressProps> = (props) => {
  const { className, current, total, currency, theme = 'light' } = props;

  const percentage = Math.round((current / total) * 100);

  return (
    <div className={classNames(cls.progressContainer, {}, [className, cls[theme]])}>
      <div className={cls.progressText}>
        <span className={cls.progressTextDeposited}>{current.toLocaleString()} {currency}</span> of {total.toLocaleString()} {currency}
      </div>

      <div className={cls.progressBarWrapper}>
        <div className={cls.progressBar}>
            <div className={cls.progressFill} style={{ width: `${percentage}%` }}></div>
        </div>
        <span className={cls.progressPercentage}>{percentage}%</span>
      </div>
    </div>
  );
};

export default Progress;
