import { FC, useRef, useState } from 'react';
import cls from './LimitListItem.module.scss';
import { SvgIcon } from 'shared/ui/SvgIcon';
import { LimitItemCard } from 'entities/Limit/model/types/limit';
import { useTranslation } from 'react-i18next';
import Progress, { ThemeProgress } from 'shared/ui/Progress/Progress';
import Tippy from '@tippyjs/react';
import { Button, ThemeButton } from 'shared/ui/Button';

interface LimitListItemProps {
  item: LimitItemCard
  onClickEdit: (limit: LimitItemCard) => void
  onClickDelete: (limit: LimitItemCard) => void
}

const LimitListItem: FC<LimitListItemProps> = (props) => {
  const { item, onClickEdit, onClickDelete } = props;

  const { t } = useTranslation(['limits', 'category']);

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const toggleDropdown = () => { setIsOpen(!isOpen); };

  // Контент выпадающего списка
  const dropdownContent = (
    <ul className={cls.dropdownMenu}>
      <li onClick={() => { setIsOpen(false); onClickEdit(item); }}>{t('limits:buttons.edit')}</li>
      <li onClick={() => { setIsOpen(false); onClickDelete(item); }}>{t('limits:buttons.delete')}</li>
    </ul>
  );

  const getStatus = (amount: number, total: number) => {
    const percentage = Math.round((amount / total) * 100);

    if (percentage === 100) {
      return {
        text: (<></>),
        themeProgress: ThemeProgress.BOTTOM
      };
    } else if (percentage > 79 && percentage < 100) {
      return {
        text: (<></>),
        themeProgress: ThemeProgress.BOTTOM_ORANGE
      };
    } else if (amount <= total) {
      return {
        text: (<></>),
        themeProgress: ThemeProgress.BOTTOM_GREEN
      };
    } else {
      return {
        text: (<p className={cls.error}>{t('limits:error')}</p>),
        themeProgress: ThemeProgress.BOTTOM_RED
      };
    }
  };

  return (
    <div className={cls.limitsCard} onMouseLeave={() => { setIsOpen(false); }}>
      <div className={cls.header}>
        <div className={cls.nameWrapper}>
          <div className={cls.icon}>
            <SvgIcon name={`${item.category.icon}`} />
          </div>
          <span className={cls.name}>{t(`category:${item.category.name}`)}</span>
        </div>
        <div className={cls.menu}>
        <Tippy
            content={dropdownContent}
            visible={isOpen}
            interactive
            placement='bottom'
            reference={buttonRef}
            offset={[0, -10]}
        >
            <div ref={buttonRef}>
            <Button theme={ThemeButton.CLEAR} onClick={toggleDropdown} className={cls.menuButton}>
                <SvgIcon name='menu-kebab' className={cls.menuButtonIcon} />
            </Button>
            </div>
        </Tippy>
        </div>
      </div>
      <div className={cls.balance}>{t('limits:balance')}: {item.balance.toLocaleString()} {item.currency}</div>
      <Progress current={item.amount} total={item.total} currency={item.currency} theme={getStatus(item.amount, item.total).themeProgress} />
      {getStatus(item.amount, item.total).text}
    </div>
  );
};

export default LimitListItem;
