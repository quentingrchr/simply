import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import s from './styles.module.scss'
import { ColorsType } from '../../types/index'
import { useInView } from 'framer-motion'

interface IProps {
  color1?: ColorsType
  color2?: ColorsType
}

export default function SlidingLayers({
  color1 = 'primary-dark',
  color2 = 'primary-light',
}: IProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
  })

  useEffect(() => {
    console.log(isInView)
  }, [isInView])
  return (
    <>
      <div ref={ref} className={s.container}>
        <div
          className={cn(s.heroLayer1, s.heroLayer, s[color1], {
            [s.visible]: isInView,
          })}
        ></div>
        <div
          className={cn(s.heroLayer2, s.heroLayer, s[color2], {
            [s.visible]: isInView,
          })}
        ></div>
      </div>
    </>
  )
}
