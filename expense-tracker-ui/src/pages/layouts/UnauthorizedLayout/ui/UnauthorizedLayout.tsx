import { classNames } from 'shared/lib/classNames/classNames';
import cls from './UnauthorizedLayout.module.scss';
import { FC } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Logo } from 'shared/ui/Logo';
import Background from 'shared/assets/img/background.png';
import LayoutBadge from 'shared/ui/LayoutBadge/LayoutBadge';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from 'shared/ui/SvgIcon';

interface UnauthorizedLayoutProps {
  className?: string
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = (props) => {
  const { className, children } = props;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('unauthorized');

  function handleClickSignIn () {
    navigate('/signin');
  }

  function handleClickSignUp () {
    navigate('/signup');
  }

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <div className={classNames(cls.unauthorizedLayout, {}, [className])}>
      <div className={cls.layoutNavbar}>
        <Logo />
        <div className={cls.buttonsWrapper}>
          <Button
            className={cls.layoutButton}
            theme={ThemeButton.PRIMARY_DARK}
            onClick={handleClickSignIn}
          >
            {t('layout.buttonLogin')}
          </Button>
          <Button
            className={cls.layoutButton}
            theme={ThemeButton.OUTLINE_DARK}
            onClick={handleClickSignUp}
          >
            {t('layout.buttonReg')}
          </Button>
          <Button
            theme={ThemeButton.CLEAR}
            onClick={toggleLang}
          >
           {i18n.language === 'ru' ? 'Язык: ru' : 'Lang: en'}
          </Button>
        </div>
      </div>
      <img src={Background} className={cls.background}></img>
      <div className={cls.backgroundFilter}></div>
      <div className={cls.wrapper}>
        <div className={cls.pageWrapper}>{children}</div>
        <div className={cls.cardsWrapper}>
          <LayoutBadge className={cls.badgeDone}>
            <SvgIcon name='done' className={cls.doneIcon} />
            <p className={cls.badgeText}>
              Goal setting
              <br></br>
              and tracking
              <br></br>
              progress
            </p>
          </LayoutBadge>
          <LayoutBadge className={cls.badgeCoin}>
            <SvgIcon name='coin' className={cls.coinIcon} />
            <p className={cls.badgeText}>
              Easily manage
              <br></br>
              your money
            </p>
          </LayoutBadge>
          <LayoutBadge className={cls.badgeFinance}>
            <SvgIcon name='finance' className={cls.financeIcon} />
            <p className={cls.badgeText}>
              Financial
              <br></br>
              insights and
              <br></br>
              analysis
            </p>
          </LayoutBadge>
          <LayoutBadge className={cls.badgeCalendar}>
            <SvgIcon name='calendar' className={cls.calendarIcon} />
            <p className={cls.badgeText}>
              Budgeting and
              <br></br>
              expence
              <br></br>
              tracking
            </p>
          </LayoutBadge>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedLayout;
