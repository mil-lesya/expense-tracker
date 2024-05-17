import { FC, useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './GoalListItem.module.scss';
import { Button, ThemeButton } from 'shared/ui/Button';
import { SvgIcon } from 'shared/ui/SvgIcon';
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';
import { Goal } from 'entities/Goal/model/types/goal';
import Progress, { ThemeProgress } from 'shared/ui/Progress/Progress';
import dayjs from 'dayjs';

interface GoalListItemProps {
  goal: Goal
  onClickEdit: (goal: Goal) => void
  onClickDelete: (goal: Goal) => void
  onClickChangeAmount: (goal: Goal, isTakeFrom: boolean) => void
  className?: string
}

const GoalListItem: FC<GoalListItemProps> = (props) => {
  const { goal, className, onClickEdit, onClickDelete, onClickChangeAmount } = props;

  const { t } = useTranslation('savings');

  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const toggleDropdown = () => { setIsOpen(!isOpen); };

  // Контент выпадающего списка
  const dropdownContent = (
    <ul className={cls.dropdownMenu}>
      <li onClick={() => { onClickEdit(goal); }}>{t('buttons.edit')}</li>
      <li onClick={() => { onClickDelete(goal); }}>{t('buttons.delete')}</li>
    </ul>
  );

  return (
    <div
      className={classNames(cls.goalListItem, {}, [className])}
      onMouseEnter={() => { setIsVisible(true); }}
      onMouseLeave={() => { setIsVisible(false); setIsOpen(false); }}
    >
      <div className={cls.imageWrapper}>
        {goal.image
          ? (
          <img src={goal.image} alt='Goal image' className={cls.image}></img>
            )
          : (
          <div className={cls.preview}>
            <SvgIcon name='image' className={cls.previewIcon} />
          </div>
            )}
      </div>

      <div className={cls.wrapper}>
        <div className={cls.infoWrapper}>
          <div>
            <div className={cls.name}>{ goal.name }</div>
            {goal.targetDate &&
              <p className={classNames(cls.targetDate, { [cls.red]: dayjs(goal.targetDate).isBefore(dayjs()) }, [])}>
                {t('modal.labelToggle')}: { dayjs(goal.targetDate).format('DD MMM YYYY') }
              </p>}
          </div>
          <Progress currency={goal.currency} current={goal.depositedAmount} total={goal.goalAmount} theme={ThemeProgress.DARK} />
        </div>

        <div className={cls.controlsWrapper}>
          <Button
            theme={ThemeButton.OUTLINE_DARK}
            className={cls.btn}
            onClick={() => { onClickChangeAmount(goal, false); }}
          >
            {t('buttons.contribute')} <SvgIcon name='plus' className={cls.iconBtn} />
          </Button>
          <Button
            theme={ThemeButton.OUTLINE_DARK}
            className={cls.btn}
            onClick={() => { onClickChangeAmount(goal, true); }}
          >
              {t('buttons.takeFrom')} <SvgIcon name='minus' className={cls.iconBtn} />
            </Button>
        </div>

        <div className={cls.buttonWrapper}>
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
        </div>
      </div>
    </div>
  );
};

export default GoalListItem;
