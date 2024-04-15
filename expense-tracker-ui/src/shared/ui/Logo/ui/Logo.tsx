import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Logo.module.scss';
import { SvgIcon } from 'shared/ui/SvgIcon';
import { memo } from 'react';

interface LogoProps {
  withoutText?: boolean
  className?: string
}

const Logo = ({ withoutText = false, className }: LogoProps) => {
  return (
    <div className={classNames(cls.logo, {}, [className])}>
      <div className={cls.logoWrapper}>
        <SvgIcon name='logo-finterst' />
      </div>
      {withoutText
        ? <></>
        : (
        <div className={cls.logoTextWrapper}>
          <p className={cls.logoName}>FINTEREST</p>
          <p className={cls.logoText}>Personal finance manager</p>
        </div>
          )}
    </div>
  );
};

export default memo(Logo);
