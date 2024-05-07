import { FC, useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './GoalListItem.module.scss';
import { Button, ThemeButton } from 'shared/ui/Button';
import { SvgIcon } from 'shared/ui/SvgIcon';
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';
import { Goal } from 'entities/Goal/model/types/goal';

interface GoalListItemProps {
  goal: Goal
  onClickEdit: (goal: Goal) => void
  onClickDelete: (goal: Goal) => void
  className?: string
}

const GoalListItem: FC<GoalListItemProps> = (props) => {
  const { goal: wallet, className, onClickEdit, onClickDelete } = props;

  const { t } = useTranslation('savings');

  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const toggleDropdown = () => { setIsOpen(!isOpen); };

  // Контент выпадающего списка
  const dropdownContent = (
    <ul className={cls.dropdownMenu}>
      <li onClick={() => { onClickEdit(wallet); }}>{t('buttons.edit')}</li>
      <li onClick={() => { onClickDelete(wallet); }}>{t('buttons.delete')}</li>
    </ul>
  );

  return (
    <div
      className={classNames(cls.walletsListItem, {}, [className])}
      onMouseEnter={() => { setIsVisible(true); }}
      onMouseLeave={() => { setIsVisible(false); setIsOpen(false); }}
    >
      <div className={cls.infoWrapper}>
        <div className={cls.name}>{ wallet.name }</div>
        {/* <div className={cls.balance}>{ wallet.isShowBalance ? Math.round(wallet.balance * 100) / 100 : '*****' } { wallet.currency }</div> */}
      </div>

      <div className={cls.buttonWrapper}>
        {isVisible && (
          <Tippy
            content={dropdownContent}
            visible={isOpen}
            interactive
            reference={buttonRef}
            placement='bottom'
            offset={[0, -10]}
          >
            <div ref={buttonRef}>
            <Button theme={ThemeButton.CLEAR} onClick={toggleDropdown} className={cls.menuButton}>
                <SvgIcon name='menu-kebab' className={cls.menuButtonIcon} />
            </Button>
            </div>
          </Tippy>
        )}
      </div>
    </div>
  );
};

export default GoalListItem;
