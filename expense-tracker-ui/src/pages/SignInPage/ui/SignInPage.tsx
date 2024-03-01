import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SignInPage.module.scss'
import LoginForm from 'features/Auth/ui/LoginForm/LoginForm'

interface SignInPageProps {
  className?: string
}

const SignInPage = ({ className }: SignInPageProps) => {
  return (
    <div className={classNames(cls.signInPage, {}, [className])}>
      <LoginForm />
    </div>
  )
}

export default SignInPage
