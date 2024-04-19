import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { InputHTMLAttributes, FC, memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IMaskInput, IMaskInputProps, useIMask } from 'react-imask';

export type HTMLInputProps = Omit<
InputHTMLAttributes<HTMLInputElement>,
'value' | 'onChange'
>;

type MaskOptions = IMaskInputProps<HTMLInputElement>;

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string | number
  label?: string
  mask?: RegExp
  maskOptions?: MaskOptions
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
    maskOptions = { mask: /[^\s]*/ },
    required = false,
    errorText,
    error,
    setError,
    minLength,
    maxLength,
    children,
    ...otherProps
  } = props;

  const { t } = useTranslation();

  const onAccept = (value: string) => {
    if (setError) {
      if (!value && required) {
        setError(t('inputs.requiredMessage'));
        onChange(value);
        return;
      }

      if (mask && !mask.test(value)) {
        setError(errorText);
      } else {
        setError(null);
      }
    }

    onChange(value);
  };

  return (
    <div className={classNames(cls.field, {}, [className])}>
      <label className={cls.label}>{label}</label>
      <div
        className={classNames(cls.inputBody, { [cls.errorInput]: error }, [])}
      >
        <IMaskInput
          className={classNames(cls.input, {}, [])}
          type={type}
          value={value != null ? String(value) : ''}
          unmask={true}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          onAccept={onAccept}
          {...maskOptions}
        />
        {children}
      </div>
      {error ? <span className={cls.errorMessage}>{error}</span> : <></>}
    </div>
  );
};

export default memo(Input);
