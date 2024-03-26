import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PageContainer.module.scss';

interface PageContainerProps {
  className?: string
}

export const PageContainer: FC<PageContainerProps> = (props) => {
  const { className, children } = props;

  return (
    <div>
      <div className={classNames(cls.pageContainer, {}, [className])}>
        {children}
      </div>
    </div>
  );
};
