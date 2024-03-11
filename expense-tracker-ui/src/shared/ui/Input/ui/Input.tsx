import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { InputHTMLAttributes, FC, memo } from 'react';

export type HTMLInputProps = Omit<
InputHTMLAttributes<HTMLInputElement>,
'value' | 'onChange'
>;

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  label?: string
  mask?: RegExp
  required?: boolean
  errorText?: string
  error?: string
  setError?: (value: string) => void
  onChange?: (value: string) => void
}

const Input: FC<InputProps> = (props) => {
  const {
    className,
    value,
    label,
    placeholder,
    onChange,
    type = 'text',
    mask,
    required = false,
    errorText,
    error,
    setError,
    minLength,
    maxLength,
    children,
    ...otherProps
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (required && !inputValue) {
      setError('Поле обязательно для заполнения');
      return;
    }
    if (mask && !mask.test(inputValue)) {
      setError(errorText);
    } else if (mask && mask.test(inputValue)) {
      setError(null);
    }
  };

  return (
    <div className={classNames(cls.field, {}, [className])}>
      <label className={cls.label}>{label}</label>
      <div
        className={classNames(cls.inputBody, { [cls.errorInput]: error }, [])}
      >
        <input
          className={classNames(cls.input, {}, [])}
          type={type}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          value={value}
          onChange={onChangeHandler}
          {...otherProps}
        />
        {children}
      </div>
      {error ? <span className={cls.errorMessage}>{error}</span> : <></>}
    </div>
  );
};

export default memo(Input);
