import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Logo.module.scss'
import LogoIcon from '../../../assets/icons/logo-finterst.svg'

interface LogoProps {
  className?: string
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={classNames(cls.logo, {}, [className])}>
      <div className={cls.logoWrapper}>
        <LogoIcon />
      </div>
      <div className={cls.logoTextWrapper}>
        <p className={cls.logoName}>FINTEREST</p>
        <p className={cls.logoText}>Personal finance manager</p>
      </div>
    </div>
  )
}

export default Logo
