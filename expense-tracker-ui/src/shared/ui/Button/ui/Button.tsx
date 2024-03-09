import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import { ButtonHTMLAttributes, FC } from 'react';

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
  disabled?: boolean
  loading?: boolean
}

const Button: FC<ButtonProps> = (props) => {
  const { className, theme, children, disabled, loading, ...otherProps } = props;

  const mods: Record<string, boolean> = {
    [cls.disabled]: disabled,
    [cls.loading]: loading
  };

  return (
    <button
      className={classNames(cls.button, mods, [className, cls[theme]])}
      disabled={disabled}
      {...otherProps}
    >
      <span className={cls.text}>{children}</span>
    </button>
  );
};

export default Button;
