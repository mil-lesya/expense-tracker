import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DashboardPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import { PageLoader } from 'shared/ui/PageLoader';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { ThemeWalletsTotalBalance, WalletsTotalBalance, getWalletsTotalBalanceIsLoading } from 'widgets/WalletsTotalBalance';
import { useSelector } from 'react-redux';

interface DashboardPageProps {
  className?: string
}

const DashboardPage: FC<DashboardPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('dashboard');
  const dispatch = useAppDispatch();

  return (
    <>
      <PageHeader>{t('title')}</PageHeader>
      <div className={classNames(cls.dashboardPage, {}, [className])}>
        {/* <PageLoader /> */}
        <div className={cls.leftBlock}>
          <WalletsTotalBalance theme={ThemeWalletsTotalBalance.DARK} />
        </div>
        <div className={cls.rightBlock}></div>
      </div>
    </>
  );
};

export default DashboardPage;
