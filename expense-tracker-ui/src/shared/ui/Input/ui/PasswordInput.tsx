import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'
import { FC, memo } from 'react'
import Input, { HTMLInputProps } from './Input'
import { useState, useEffect } from 'react'
import EyeIcon from '../../../assets/icons/eye.svg'
import EyeOffIcon from '../../../assets/icons/eye-off.svg'

interface PasswordInputProps extends HTMLInputProps {
  className?: string
  value?: string
  label?: string
  placeholder?: string
  error?: string
  onChange?: (value: string) => void
}

const PasswordInput: FC<PasswordInputProps> = memo((props) => {
  const {
    className,
    value,
    label,
    placeholder,
    error,
    onChange,
    ...otherProps
  } = props

  const [visiblePassword, setVisiblePassword] = useState(false)
  const [passwordType, setPasswordType] = useState('password')

  useEffect(() => {
    if (visiblePassword) {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }, [visiblePassword])

  const onIconClick = () => {
    setVisiblePassword(!visiblePassword)
  }
  return (
    <Input
      className={className}
      value={value}
      label={label}
      placeholder={placeholder}
      type={passwordType}
      error={error}
      onChange={onChange}
    >
      <button className={cls.iconButton} onClick={onIconClick}>
        {visiblePassword ? (
          <EyeIcon className={cls.icon} />
        ) : (
          <EyeOffIcon className={cls.icon} />
        )}
      </button>
    </Input>
  )
})

export default PasswordInput
