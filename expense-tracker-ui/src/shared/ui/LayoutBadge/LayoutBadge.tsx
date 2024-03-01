import { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LayoutBadge.module.scss'

interface LayoutBadgeProps {
  className?: string
}

const LayoutBadge: FC<LayoutBadgeProps> = (props) => {
  const { className, children } = props

  return (
    <div className={classNames(cls.layoutBadge, {}, [className])}>
      {children}
    </div>
  )
}

export default LayoutBadge
