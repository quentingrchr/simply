import React from 'react'
import cn from 'classnames'
import s from './styles.module.scss';
import { ColorsType } from '../../types/index';



interface IProps {
  color1?: ColorsType;
  color2?: ColorsType;
}

export default function SlidingLayers({ color1 = 'primary-dark', color2 = 'primary-light' }: IProps) {
  return (
    <>
      <div className={cn(s.heroLayer1, s.heroLayer, s[color1])}></div>
      <div className={cn(s.heroLayer2, s.heroLayer, s[color2])}></div>
    </>
  )
}
