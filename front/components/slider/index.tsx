import React, { useState } from 'react'
import s from './styles.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'

import { IBasicImage } from '@interfaces'
import 'swiper/css'
import 'swiper/css/pagination'

import cn from 'classnames'

export type IProps = {
  images: IBasicImage[]
}

export default function Slider({ images }: IProps) {
  const [swiper, setSwiper] = useState<null | any>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const slideTo = (index: number) => {
    if (!swiper) return
    console.log(swiper.activeIndex)
    swiper.slideTo(index)
  }

  return (
    <div className={s.container}>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex)
        }}
      >
        {images.length > 0 &&
          images.map((img, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  className={s.img}
                  src={img.src}
                  alt={img.alt ? img.alt : 'Slider image'}
                />
              </SwiperSlide>
            )
          })}
      </Swiper>
      <div className={s.pagination}>
        {!!swiper &&
          images.length > 0 &&
          images.map((_, index) => {
            return (
              <div
                key={index}
                className={cn(s.paginationItem, {
                  [s.active]: index === activeIndex,
                })}
                onClick={() => slideTo(index)}
              ></div>
            )
          })}
      </div>
    </div>
  )
}
