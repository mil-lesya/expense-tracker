import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './BudgetsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';

interface BudgetsPageProps {
  className?: string
}

const BudgetsPage: FC<BudgetsPageProps> = (props) => {
  const { className } = props;

  return (
    <>
      <PageHeader>Budgets</PageHeader>
      <div className={classNames(cls.budgetsPage, {}, [className])}>
        <p>budgetsPage</p>
      </div>
    </>
  );
};

export default BudgetsPage;
