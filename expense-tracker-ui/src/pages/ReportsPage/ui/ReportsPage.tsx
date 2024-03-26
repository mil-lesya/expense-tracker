import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ReportsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';

interface ReportsPageProps {
  className?: string
}

const ReportsPage: FC<ReportsPageProps> = (props) => {
  const { className } = props;

  return (
    <>
      <PageHeader>Reports</PageHeader>
      <div className={classNames(cls.reportsPage, {}, [className])}>
        <p>reportsPage</p>
      </div>
    </>
  );
};

export default ReportsPage;
