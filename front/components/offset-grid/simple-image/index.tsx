import React from 'react'
import cn from 'classnames'
import s from './styles.module.scss'
import SlidingLayers from '@components/sliding-layers'

export interface IProps {
  img: {
    src: string
    alt?: string
  }
}

export default function SimpleImage({ img }: IProps) {
  return (
    <div className={s.imgContainer}>
      <img
        className={s.img}
        src={img.src}
        alt={img.alt ? img.alt : 'Alt of the image'}
      />
    </div>
  )
}
