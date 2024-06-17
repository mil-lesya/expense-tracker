import React, { useEffect, useRef, useState } from 'react';
import styles from './BudgetCarusel.module.scss';
import { Budget, BudgetItemCarusel, BudgetPeriod } from 'entities/Budget/model/types/budget';
import Progress, { ThemeProgress } from 'shared/ui/Progress/Progress';
import { Button, ThemeButton } from 'shared/ui/Button';
import { SvgIcon } from 'shared/ui/SvgIcon';
import { useTranslation } from 'react-i18next';
import Tippy from '@tippyjs/react';

interface CarouselProps {
  items: BudgetItemCarusel[]
  changeIndex: (index: number) => void
  onAdd: (period: BudgetPeriod) => void
  onClickEdit: (budget: Budget) => void
  onClickDelete: (budget: Budget) => void
}

const periods: BudgetPeriod[] = ['weekly', 'monthly', 'yearly'];

const BudgetCarusel: React.FC<CarouselProps> = ({ items, changeIndex, onAdd, onClickEdit, onClickDelete }) => {
  const { t } = useTranslation('budgets');

  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentItem, setCurrentItem] = useState<BudgetItemCarusel>();

  useEffect(() => {
    switch (currentIndex) {
      case 0:
        setCurrentItem(getItemForPeriod('weekly'));
        break;
      case 1:
        setCurrentItem(getItemForPeriod('monthly'));
        break;
      case 2:
        setCurrentItem(getItemForPeriod('yearly'));
        break;
    }
  }, [currentIndex, items]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => {
      const val = prevIndex === 0 ? periods.length - 1 : prevIndex - 1;
      changeIndex(val);
      return val;
    });
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => {
      const val = prevIndex === periods.length - 1 ? 0 : prevIndex + 1;
      changeIndex(val);
      return val;
    });
  };

  const getItemForPeriod = (period: string) => {
    return items.find(item => item.period === period);
  };

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const toggleDropdown = () => { setIsOpen(!isOpen); };

  // Контент выпадающего списка
  const dropdownContent = (
    <ul className={styles.dropdownMenu}>
      <li onClick={() => { onClickEdit(currentItem); }}>{t('buttons.edit')}</li>
      <li onClick={() => { onClickDelete(currentItem); }}>{t('buttons.delete')}</li>
    </ul>
  );

  const getStatus = (amount: number, total: number) => {
    const percentage = Math.round((amount / total) * 100);

    if (percentage === 100) {
      return {
        text: t('status.ok'),
        icon: (<SvgIcon name='done' className={styles.statusIcon} />),
        themeProgress: ThemeProgress.LIGHT
      };
    } else if (percentage > 79 && percentage < 100) {
      return {
        text: t('status.warn'),
        icon: (<SvgIcon name='warn' className={styles.statusIconWarn} />),
        themeProgress: ThemeProgress.ORANGE
      };
    } else if (amount <= total) {
      return {
        text: t('status.ok'),
        icon: (<SvgIcon name='done' className={styles.statusIcon} />),
        themeProgress: ThemeProgress.GREEN
      };
    } else {
      return {
        text: t('status.error'),
        icon: (<SvgIcon name='error' className={styles.statusIconError} />),
        themeProgress: ThemeProgress.RED
      };
    }
  };

  return (
    <div className={styles.carousel} onMouseLeave={() => { setIsOpen(false); }}>
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
                  <Progress
                    current={item.amount}
                    total={item.total}
                    currency={item.currency}
                    theme={getStatus(item.amount, item.total).themeProgress} />
                  <div className={styles.statusWrapper}>
                    <div className={styles.status}>
                        <div className={styles.statusIconWrapper}>
                           {getStatus(item.amount, item.total).icon}
                        </div>
                        <p className={styles.statusText}>{getStatus(item.amount, item.total).text}</p>
                    </div>
                    <Tippy
                        content={dropdownContent}
                        visible={isOpen}
                        interactive
                        placement='bottom'
                        reference={buttonRef}
                        offset={[0, -10]}
                    >
                        <div ref={buttonRef}>
                        <Button theme={ThemeButton.CLEAR} onClick={toggleDropdown} className={styles.menuButton}>
                            <SvgIcon name='menu-kebab' className={styles.menuButtonIcon} />
                        </Button>
                        </div>
                    </Tippy>
                  </div>
                </div>
                  )
                : (
                <Button className={styles.createBtn} onClick={() => { onAdd(period); }} theme={ThemeButton.PRIMARY}>{t('buttons.create')}</Button>
                  )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetCarusel;
