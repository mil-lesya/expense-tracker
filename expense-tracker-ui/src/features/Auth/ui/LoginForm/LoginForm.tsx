import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import Input from 'shared/ui/Input/ui/Input'
import { useState } from 'react'
import { Button, ThemeButton } from 'shared/ui/Button'
import PasswordInput from 'shared/ui/Input/ui/PasswordInput'

interface LoginFormProps {
  className?: string
}

const LoginForm = ({ className }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const onChangeEmail = (val: string) => {
    setEmail(val)
  }

  const onChangePassword = (val: string) => {
    setPassword(val)
    if (passwordError) setPasswordError(null)
  }

  const onClickError = () => {
    setPasswordError('error')
  }

  return (
    <div className={classNames(cls.loginForm, {}, [className])}>
      <h1 className={cls.title}>Welcome back</h1>
      <p className={cls.subtitle}>Sign in for smarter money management</p>
      <div className={cls.fields}>
        <Input
          value={email}
          onChange={onChangeEmail}
          label='Email'
          placeholder='example@mail.com'
        />
        <PasswordInput
          value={password}
          onChange={onChangePassword}
          label='Password'
          placeholder='Your password'
          error={passwordError}
        />
      </div>
      <Button
        onClick={onClickError}
        theme={ThemeButton.PRIMARY}
        className={cls.loginButton}
      >
        Sign in
      </Button>
      {/* <p>Don't have an account?</p> */}
    </div>
  )
}

export default LoginForm
