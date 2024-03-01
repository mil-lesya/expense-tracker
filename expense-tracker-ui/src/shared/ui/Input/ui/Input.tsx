import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'
import { InputHTMLAttributes, FC, memo } from 'react'

export type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  label?: string
  error?: string
  onChange?: (value: string) => void
}

const Input: FC<InputProps> = memo((props) => {
  const {
    className,
    value,
    label,
    placeholder,
    onChange,
    type = 'text',
    error,
    children,
    ...otherProps
  } = props

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

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
          value={value}
          onChange={onChangeHandler}
          {...otherProps}
        />
        {children}
      </div>
      {error ? <span className={cls.errorMessage}>{error}</span> : <></>}
    </div>
  )
})

export default Input
