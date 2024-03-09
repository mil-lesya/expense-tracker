import { FC, memo, useState, useEffect } from 'react';
import Input, { HTMLInputProps } from './Input';
import EyeIcon from '../../../assets/icons/eye.svg';
import EyeOffIcon from '../../../assets/icons/eye-off.svg';
import cls from './Input.module.scss';

interface PasswordInputProps extends HTMLInputProps {
  className?: string
  value?: string
  label?: string
  placeholder?: string
  mask?: RegExp
  required?: boolean
  errorText?: string
  error?: string
  setError?: (value: string) => void
  onChange?: (value: string) => void
}

const PasswordInput: FC<PasswordInputProps> = (props) => {
  const {
    className,
    value,
    label,
    placeholder,
    mask,
    required = false,
    errorText,
    error,
    setError,
    onChange,
    ...otherProps
  } = props;

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [passwordType, setPasswordType] = useState('password');

  useEffect(() => {
    if (visiblePassword) {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  }, [visiblePassword]);

  const onIconClick = () => {
    setVisiblePassword(!visiblePassword);
  };
  return (
    <Input
      className={className}
      value={value}
      label={label}
      placeholder={placeholder}
      type={passwordType}
      mask={mask}
      required={required}
      errorText={errorText}
      error={error}
      setError={setError}
      onChange={onChange}
    >
      <button className={cls.iconButton} onClick={onIconClick}>
        {visiblePassword
          ? (
          <EyeIcon className={cls.icon} />
            )
          : (
          <EyeOffIcon className={cls.icon} />
            )}
      </button>
    </Input>
  );
};

export default memo(PasswordInput);
