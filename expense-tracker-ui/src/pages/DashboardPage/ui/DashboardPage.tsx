import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DashboardPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';

interface DashboardPageProps {
  className?: string
}

const DashboardPage: FC<DashboardPageProps> = (props) => {
  const { className } = props;

  return (
    <>
      <PageHeader>Dashboard</PageHeader>
      <div className={classNames(cls.dashboardPage, {}, [className])}>
        <p>aaa</p>
      </div>
    </>
  );
};

export default DashboardPage;
