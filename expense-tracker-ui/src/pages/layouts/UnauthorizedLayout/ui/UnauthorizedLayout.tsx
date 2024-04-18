import { classNames } from 'shared/lib/classNames/classNames';
import cls from './UnauthorizedLayout.module.scss';
import { FC, useEffect, useState } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Logo } from 'shared/ui/Logo';
import Background from 'shared/assets/img/background.png';
import LayoutBadge from 'shared/ui/LayoutBadge/LayoutBadge';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from 'shared/ui/SvgIcon';
import { useMediaWidth } from 'shared/lib/hooks/useMediaWidth';
import { MOBILE_SIZE } from 'shared/const/windowSizes';

interface UnauthorizedLayoutProps {
  className?: string
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = (props) => {
  const { className, children } = props;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('unauthorized');
  const { currentStyle } = useMediaWidth();

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (currentStyle === MOBILE_SIZE) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [currentStyle]);

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
        <Logo withoutText={isMobile} />
        <div className={cls.buttonsWrapper}>
          {!isMobile && (
            <>
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
            </>
          )}
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
              {t('layout.goalSetting')}
              <br></br>
              {t('layout.andTracking')}
              <br></br>
              {t('layout.progress')}
            </p>
          </LayoutBadge>
          <LayoutBadge className={cls.badgeCoin}>
            <SvgIcon name='coin' className={cls.coinIcon} />
            <p className={cls.badgeText}>
              {t('layout.easilyManage')}
              <br></br>
              {t('layout.yourMoney')}
            </p>
          </LayoutBadge>
          <LayoutBadge className={cls.badgeFinance}>
            <SvgIcon name='finance' className={cls.financeIcon} />
            <p className={cls.badgeText}>
              {t('layout.financial')}
              <br></br>
              {t('layout.insightsAnd')}
              <br></br>
              {t('layout.analysis')}
            </p>
          </LayoutBadge>
          <LayoutBadge className={cls.badgeCalendar}>
            <SvgIcon name='calendar' className={cls.calendarIcon} />
            <p className={cls.badgeText}>
              {t('layout.budgetingAnd')}
              <br></br>
              {t('layout.expense')}
              <br></br>
              {t('layout.tracking')}
            </p>
          </LayoutBadge>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedLayout;
