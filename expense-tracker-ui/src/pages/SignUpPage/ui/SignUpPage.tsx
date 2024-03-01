import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SignUpPage.module.scss'

interface SignUpPageProps {
  className?: string
}

const SignUpPage = ({ className }: SignUpPageProps) => {
  return (
    <div className={classNames(cls.SignUpPage, {}, [className])}>
      <div>SignUpPage</div>
    </div>
  )
}

export default SignUpPage
