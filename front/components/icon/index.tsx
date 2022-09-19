import React from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import IcomoonReact from 'icomoon-react'
import iconSet from '@assets/icomoon/selection.json'
import { IconsType } from '../../types'

type SizesType = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type IProps = {
  type: IconsType
  size?: SizesType
  color:
    | 'primary-light'
    | 'primary-dark'
    | 'secondary'
    | 'tertiary'
    | 'black'
    | 'white'
  customSize?: number | string
  position?: 'inline' | 'center'
  onClick?: () => void
}

const sizeMap: {
  [key in SizesType]: string
} = {
  xxs: '8px',
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
}

export default function Icon({
  type,
  size = 'md',
  customSize,
  color,
  position = 'inline',
  onClick,
}: IProps) {
  const computedSize = customSize !== undefined ? customSize : sizeMap[size]
  const onClickHandler = onClick ? onClick : () => {}
  return (
    <span className={cn(s[color], s.iconContainer, s[position])} onClick={onClickHandler}>
      <IcomoonReact
        iconSet={iconSet}
        icon={type}
        size={computedSize}
        className={cn(s.icon, s[type])}
      />
    </span>
  )
}
