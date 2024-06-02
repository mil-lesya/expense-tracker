import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './BudgetsPage.module.scss';
import { PageHeader } from 'shared/ui/PageHeader';
import { BudgetCarusel } from 'entities/Budget';
import { useTranslation } from 'react-i18next';
import { BudgetItemCarusel } from 'entities/Budget/model/types/budget';
import { CurrencyCode } from 'shared/const/common';
import { Button, ThemeButton } from 'shared/ui/Button';
import { SvgIcon } from 'shared/ui/SvgIcon';
import Progress, { ThemeProgress } from 'shared/ui/Progress/Progress';

const budgets: BudgetItemCarusel[] = [
  { id: '1', name: 'Мой недельный бюджет', amount: 1408, total: 2000, currency: CurrencyCode.USD, period: 'weekly' },
  { id: '2', name: 'Мой ежемесячный бюджет', amount: 2500, total: 5000, currency: CurrencyCode.USD, period: 'monthly' }
  // { id: '3', name: 'My Yearly budget', amount: 3200, total: 5000, currency: CurrencyCode.USD, period: 'yearly' }
];

const limits = [
  { id: '1', name: 'pets', icon: 'pet', amount: 100, total: 50, balance: 50, currency: CurrencyCode.USD },
  { id: '2', name: 'clothing', icon: 'dress', amount: 120, total: 50, balance: 70, currency: CurrencyCode.USD },
  { id: '3', name: 'transport', icon: 'car', amount: 100, total: 50, balance: 50, currency: CurrencyCode.USD },
  { id: '4', name: 'cosmetics', icon: 'cosmetic', amount: 110, total: 50, balance: 60, currency: CurrencyCode.USD },
  { id: '5', name: 'onlineShopping', icon: 'shopping', amount: 100, total: 50, balance: 50, currency: CurrencyCode.USD }
];
interface BudgetsPageProps {
  className?: string
}

const BudgetsPage: FC<BudgetsPageProps> = (props) => {
  const { className } = props;

  const { t } = useTranslation(['budgets', 'limits', 'category']);

  return (
    <>
      <PageHeader>{t('budgets:title')}</PageHeader>
      <div className={classNames(cls.budgetsPage, {}, [className])}>
        <BudgetCarusel items={budgets} />
        <div className={cls.limitsHeaderWrapper}>
          <div className={cls.limitsHeader}>
            <h3 className={cls.limitsTitle}>{t('limits:title')}</h3>
            <p className={cls.limitsInfo}>{t('limits:info')}</p>
          </div>
          <Button theme={ThemeButton.PRIMARY}>{t('limits:buttons.create')}</Button>
        </div>

        <div className={cls.limitsList}>
          {limits.map((item) => (
            <div className={cls.limitsCard} key={item.id}>
              <div className={cls.header}>
                <div className={cls.nameWrapper}>
                  <div className={cls.icon}>
                    <SvgIcon name={`${item.icon}`} />
                  </div>
                  <span className={cls.name}>{t(`category:${item.name}`)}</span>
                </div>
                <div className={cls.menu}><SvgIcon name='menu-kebab' className={cls.iconMenu} /></div>
              </div>
              <div className={cls.balance}>{t('limits:balance')}: {item.balance.toLocaleString()} {item.currency}</div>
              <Progress current={item.total} total={item.amount} currency={item.currency} theme={ThemeProgress.BOTTOM} />
              {/* <div className={styles.details}>
                <span>{item.amount.toLocaleString()} {item.currency} of {total.toLocaleString()} {currency}</span>
                <span className={cls.percentage}>{percentage}%</span>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BudgetsPage;
