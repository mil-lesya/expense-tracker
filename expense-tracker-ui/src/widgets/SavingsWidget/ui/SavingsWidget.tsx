import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SavingsWidget.module.scss';
import { useSelector } from 'react-redux';
import { getUserGoals } from 'entities/Goal';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button';
import { SvgIcon } from 'shared/ui/SvgIcon';
import Progress, { ThemeProgress } from 'shared/ui/Progress/Progress';
import { useNavigate } from 'react-router-dom';

interface SavingsWidgetProps {
  className?: string
}

const COUNT_SAVINGS = 5;

const SavingsWidget: FC<SavingsWidgetProps> = (props) => {
  const { className } = props;

  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();

  const goals = useSelector(getUserGoals.selectAll);

  return (
    <div className={classNames(cls.savingsWidget, {}, [className])}>
       <div className={cls.titleWrapper}>
        <p className={cls.title}>{t('savingsTitle')}</p>
        <Button theme={ThemeButton.CLEAR} onClick={() => { navigate('/savings'); }}>
            {t('seeAll')}
            <SvgIcon name='arrow-down' />
        </Button>
       </div>

        <div className={cls.list}>
        {goals.map((item, index) => index < COUNT_SAVINGS && (
            <div key={item.id}>
                <p className={cls.goalName}>{item.name}</p>
                <Progress current={item.depositedAmount} total={item.goalAmount} currency={item.currency} theme={ThemeProgress.DARK_MINI} />
            </div>
        ))}
       </div>
    </div>
  );
};

export default SavingsWidget;
