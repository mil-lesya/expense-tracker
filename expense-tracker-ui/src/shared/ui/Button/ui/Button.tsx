import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'
import { ButtonHTMLAttributes, FC } from 'react'

export enum ThemeButton {
  PRIMARY = 'primary',
  PRIMARY_DARK = 'primaryDark',
  OUTLINE = 'outline',
  OUTLINE_DARK = 'outlineDark',
  CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
}

const Button: FC<ButtonProps> = (props) => {
  const { className, theme, children, ...otherProps } = props
  return (
    <button
      className={classNames(cls.button, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button
