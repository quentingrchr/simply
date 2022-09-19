import React from 'react'
import cn from 'classnames'
import s from './styles.module.scss'
import SlidingLayers from '@components/sliding-layers'
import { ColorsType } from '../../../types'

export interface IProps {
  img: {
    src: string
    alt?: string
  }
  slidingLayers?: [ColorsType, ColorsType]
}

export default function SimpleImage({ img, slidingLayers}: IProps) {
  return (
    <div className={s.imgContainer}>
      {slidingLayers && slidingLayers.length == 2 && <SlidingLayers color1={slidingLayers[0]} color2={slidingLayers[1]}/>}
      <img
        className={s.img}
        src={img.src}
        alt={img.alt ? img.alt : 'Alt of the image'}
      />
    </div>
  )
}
