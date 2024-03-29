import React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import s from './styles.module.scss'

import { isInternalURL } from '@utils/index'

interface IProps {
  children: React.ReactNode
  onClick?: (e: any) => void
  to?: string
  target?: string
  fullWidth?: boolean
  upperCase?: boolean
  variant?:
    | 'primary'
    | 'primaryLight'
    | 'secondary'
    | 'tertiary'
    | 'white'
    | 'transparent'
  type?: 'button' | 'submit'
}

export default function Button({
  onClick,
  children,
  to,
  target = '_blank',
  fullWidth = false,
  upperCase = false,
  variant = 'primary',
  type = 'button',
}: IProps) {
  const classNames = cn(
    s.button,
    'primary',
    { [s.fullWidth]: fullWidth },
    { [s.upperCase]: upperCase },
    s[variant]
  )
  if (onClick !== undefined) {
    return (
      <button
        onClick={(e: any) => {
          onClick(e)
        }}
        className={classNames}
        type={type}
      >
        <span className={s.label}>{children}</span>
        <span className={s.bg}></span>
      </button>
    )
  } else if (to && isInternalURL(to)) {
    return (
      <Link href={to} target={target} rel="noreferrer">
        <a className={classNames}>
          <span className={s.label}>{children}</span>
          <span className={s.bg}></span>
        </a>
      </Link>
    )
  } else if (to && !isInternalURL(to)) {
    return (
      <a className={classNames} href={to} target={target} rel="noreferrer">
        <span className={s.label}>{children}</span>
        <span className={s.bg}></span>
      </a>
    )
  } else {
    throw new Error('Button must have either onClick or to prop')
  }
}
