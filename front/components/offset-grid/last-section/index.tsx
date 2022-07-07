import React from 'react'
import cn from 'classnames'
import Link from 'next/link'

import { Button } from '@components'
import s from './styles.module.scss'
import { IBasicImage } from '@interfaces/index'

export interface IProps {
  variant?: 'tertiary'
  img?: IBasicImage
  title: string
  subtitle?: string
  titleLink?: string
}

export default function LastSection({
  subtitle,
  title,
  variant = 'tertiary',
  titleLink,
}: IProps) {
  return (
    <>
      {titleLink ? (
        <a
          className={cn(s.lastSection, s[variant], s.link)}
          href={titleLink}
          target="_blank"
          rel="noreferrer"
        >
          {subtitle && <span className={s.subtitle}>{subtitle}</span>}
          <h2 className={s.title}>{title}</h2>
        </a>
      ) : (
        <div className={cn(s.lastSection, s[variant])}>
          {subtitle && <span className={s.subtitle}>{subtitle}</span>}
          <h2 className={s.title}>{title}</h2>
        </div>
      )}
    </>
  )
}
