import React from 'react'
import s from './styles.module.scss'
import cn from 'classnames'

export type IProps = {
  tag?: 'h1' | 'h2' | 'p'
}

export default function Logo({ tag = 'p' }: IProps) {
  switch (tag) {
    case 'h1':
      return <h1 className={s.logo}>Simply</h1>
    case 'h2':
      return <h2 className={s.logo}>Simply</h2>
    case 'p':
      return <p className={s.logo}>Simply</p>
  }
}
