import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import s from './styles.module.scss'

import { splitIntoSpan } from '@utils/index'
import { useScroll } from '@hooks/index'
import { SlidingLayers } from '@components/index'

interface IProps {
  title?: string
  img: {
    src?: string
    alt?: string
    sources?: {
      xl: string
      lg: string
      md: string
      sm: string
    }
  }
}

export default function Button({ img, title }: IProps) {
  const { scrollY } = useScroll()
  const [windowHeight, setWindowHeight] = useState(0)
  const [scaleRatio, setScaleRatio] = useState(0)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    setScaleRatio(Number((scrollY / windowHeight / 6).toFixed(4)))
  }, [scrollY])

  const cssVars = {
    '--transform-scale': `scale(${1 + scaleRatio})`,
  } as React.CSSProperties

  return (
    <section className={s.heroContainer} style={cssVars}>
      <div className={s.textContainer}>
        {!!title && (
          <h3
            className={s.title}
            dangerouslySetInnerHTML={{ __html: splitIntoSpan(title) }}
          ></h3>
        )}
      </div>
      <SlidingLayers />
      {img.src && (
        <img
          className={s.heroImg}
          src={img.src}
          alt={img.alt ? img.alt : 'Alt of the image'}
        />
      )}
      {img.sources && (
        <picture>
          <source
            className={s.heroImg}
            srcSet={img.sources.xl}
            media="(min-width: 1200px)"
          />
          <source
            className={s.heroImg}
            srcSet={img.sources.lg}
            media="(min-width: 992px)"
          />
          <source
            className={s.heroImg}
            srcSet={img.sources.md}
            media="(min-width: 768px)"
          />
          <source
            className={s.heroImg}
            srcSet={img.sources.sm}
            media="(min-width: 576px)"
          />
          <img
            className={s.heroImg}
            src={img.sources.sm}
            alt={img.alt ? img.alt : 'Alt of the image'}
          />
        </picture>
      )}
    </section>
  )
}
