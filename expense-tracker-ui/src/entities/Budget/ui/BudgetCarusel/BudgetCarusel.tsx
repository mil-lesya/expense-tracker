import React, { useState } from 'react';
import styles from './BudgetCarusel.module.scss';
import { BudgetItemCarusel } from 'entities/Budget/model/types/budget';
import Progress from 'shared/ui/Progress/Progress';
import { Button, ThemeButton } from 'shared/ui/Button';
import { SvgIcon } from 'shared/ui/SvgIcon';
import { useTranslation } from 'react-i18next';

interface CarouselProps {
  items: BudgetItemCarusel[]
}

const periods = ['weekly', 'monthly', 'yearly'];

const BudgetCarusel: React.FC<CarouselProps> = ({ items }) => {
  const { t } = useTranslation('budgets');

  const [currentIndex, setCurrentIndex] = useState(1);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? periods.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === periods.length - 1 ? 0 : prevIndex + 1));
  };

  const getItemForPeriod = (period: string) => {
    return items.find(item => item.period === period);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselContent}>
        {periods.map((period, index) => {
          const item = getItemForPeriod(period);
          return (
            <div
              key={period}
              className={`${styles.carouselItem} ${index === currentIndex ? styles.active : ''}`}
              style={{ transform: `translateX(${-currentIndex * 100}%)` }}
            >
              <div className={styles.header}>
                <Button onClick={handlePrevClick} theme={ThemeButton.ICON_LIGHT}>
                  <SvgIcon name='arrow-left' />
                </Button>
                <span>{t(`period.${period}`)}</span>
                <Button onClick={handleNextClick} theme={ThemeButton.ICON_LIGHT}>
                  <SvgIcon name='arrow-right' />
                </Button>
              </div>
              {item
                ? (
                <div className={styles.body}>
                  <h2 className={styles.name}>{item.name}</h2>
                  <Progress current={item.amount} total={item.total} currency={item.currency} />
                  <div className={styles.status}>
                    <div className={styles.statusIconWrapper}>
                        <SvgIcon name='done' className={styles.statusIcon} />
                    </div>
                    <p className={styles.statusText}>{item.amount < item.total ? t('status.ok') : t('status.error')}</p>
                  </div>
                </div>
                  )
                : (
                <Button onClick={() => { }} theme={ThemeButton.PRIMARY}>{t('buttons.create')}</Button>
                  )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetCarusel;
