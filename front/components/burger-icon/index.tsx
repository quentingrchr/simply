import React from 'react'
import s from './styles.module.scss'
import cn from 'classnames'

export type IProps = {
  isOpen: boolean
}

export default function BurgerIcon({ isOpen = false }: IProps) {
  return (
    <div className={cn(s.burgerIcon, { [s.open]: isOpen })}>
      <div className={s.burgerIconLine}></div>
      <div className={s.burgerIconLine}></div>
      <div className={s.burgerIconLine}></div>
    </div>
  )
}
