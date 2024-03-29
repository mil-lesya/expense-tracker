import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DashboardPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import { PageLoader } from 'shared/ui/PageLoader';

interface DashboardPageProps {
  className?: string
}

const DashboardPage: FC<DashboardPageProps> = (props) => {
  const { className } = props;

  return (
    <>
      <PageHeader>Dashboard</PageHeader>
      <div className={classNames(cls.dashboardPage, {}, [className])}>
        <PageLoader />
      </div>
    </>
  );
};

export default DashboardPage;
