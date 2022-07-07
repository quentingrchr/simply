import React from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { Icon } from '@components'
import { IconsType } from '../../types'

export type IProps = {
  icon: IconsType
  text: string
  onClick?: () => void
}

export default function IconWithTextCta({ icon, text, onClick }: IProps) {
  function handleClick() {
    if (onClick) {
      onClick()
    }
  }
  return (
    <div className={s.cta} onClick={handleClick}>
      <div className={s.icon}>
        <Icon type={icon} color="primary-light" size="sm" />
      </div>
      <div className={s.text}>{text}</div>
    </div>
  )
}
