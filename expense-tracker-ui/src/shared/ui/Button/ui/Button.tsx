import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import { ButtonHTMLAttributes, FC, memo } from 'react';

export enum ThemeButton {
  PRIMARY = 'primary',
  PRIMARY_DARK = 'primaryDark',
  OUTLINE = 'outline',
  OUTLINE_DARK = 'outlineDark',
  CLEAR = 'clear',
  ICON = 'iconTheme',
  GREY = 'grey'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
  disabled?: boolean
  loading?: boolean
  active?: boolean
}

const Button: FC<ButtonProps> = (props) => {
  const { className, theme, children, disabled, loading, active, ...otherProps } = props;

  const mods: Record<string, boolean> = {
    [cls.disabled]: disabled,
    [cls.loading]: loading,
    [cls.active]: active
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

export default memo(Button);
