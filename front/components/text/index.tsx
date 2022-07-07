import React from 'react'
import s from './styles.module.scss'
import cn from 'classnames'

export type IProps = {
  children: React.ReactNode
  color:
    | 'primary-light'
    | 'primary-dark'
    | 'secondary'
    | 'tertiary'
    | 'black'
    | 'white'
  className?: string
  type: 'h1' | 'h2' | 'h-uppercase' | 'paragraph'
}

export default function Text({
  type = 'h1',
  color = 'black',
  children,
  className,
}: IProps) {
  return <div className={cn(s[type], s[color], className)}>{children}</div>
}
