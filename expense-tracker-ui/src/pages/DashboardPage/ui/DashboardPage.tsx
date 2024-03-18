import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DashboardPage.module.scss';

interface DashboardPageProps {
  className?: string
}

const DashboardPage: FC<DashboardPageProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.DashboardPage, {}, [className])}>
       <div>Dashboard Page</div>
    </div>
  );
};

export default DashboardPage;
