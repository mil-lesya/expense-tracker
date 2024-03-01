import { classNames } from 'shared/lib/classNames/classNames'
import cls from './UnauthorizedLayout.module.scss'
import { FC } from 'react'
import { Button, ThemeButton } from 'shared/ui/Button'
import { useNavigate } from 'react-router-dom'
import { Logo } from 'shared/ui/Logo'
import Background from 'shared/assets/img/background.png'
import LayoutBadge from 'shared/ui/LayoutBadge/LayoutBadge'
import DoneIcon from 'shared/assets/icons/done.svg'
import CoinIcon from 'shared/assets/icons/coin.svg'

interface UnauthorizedLayoutProps {
  className?: string
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = (props) => {
  const { className, children } = props
  const navigate = useNavigate()

  function handleClickSignIn() {
    navigate('/signin')
  }

  function handleClickSignUp() {
    navigate('/signup')
  }

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
            Sign in
          </Button>
          <Button
            className={cls.layoutButton}
            theme={ThemeButton.OUTLINE_DARK}
            onClick={handleClickSignUp}
          >
            Sign up
          </Button>
        </div>
      </div>
      <img src={Background} className={cls.background}></img>
      <div className={cls.backgroundFilter}></div>
      <div className={cls.wrapper}>
        <div className={cls.pageWrapper}>{children}</div>
        <div className={cls.cardsWrapper}>
          <LayoutBadge>
            <DoneIcon className={cls.doneIcon} />
            <p className={cls.badgeText}>
              Goal setting
              <br />
              and tracking
              <br />
              progress
            </p>
          </LayoutBadge>
          <LayoutBadge>
            <CoinIcon className={cls.coinIcon} />
            <p className={cls.badgeText}>
              Easily manage
              <br />
              your money
            </p>
          </LayoutBadge>
          <LayoutBadge>
            <CoinIcon className={cls.coinIcon} />
            <p className={cls.badgeText}>
              Easily manage
              <br />
              your money
            </p>
          </LayoutBadge>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedLayout
