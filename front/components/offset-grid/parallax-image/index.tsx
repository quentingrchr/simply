import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import cn from 'classnames'
import s from './styles.module.scss'
import { useScroll } from '@hooks'
import { IBasicImage } from '@interfaces/index'
import { headerHeightState } from '@recoil/header/atom'
import { useRecoilValue } from 'recoil'

// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser.
const canUseDOM: boolean = !!(
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
)
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect
export interface IProps {
  img: IBasicImage
}

export default function ParallaxImage({ img }: IProps) {
  const { scrollY } = useScroll()
  const [distanceFromTop, setDistanceFromTop] = useState(0)
  const [height, setHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const headerHeight = useRecoilValue(headerHeightState)

  function handleResize() {
    if (
      containerRef.current &&
      document !== undefined &&
      window !== undefined
    ) {
      setDistanceFromTop(document.body.scrollHeight)
      setHeight(window.innerHeight)
      setDistanceFromTop(
        window.pageYOffset + containerRef.current.getBoundingClientRect().top
      )
    }
  }

  useIsomorphicLayoutEffect(() => {
    if (document && document.body && window) {
      setDistanceFromTop(document.body.scrollHeight)
      setHeight(window.innerHeight)
    }
  }, [containerRef, headerHeight])

  useIsomorphicLayoutEffect(() => {
    if (containerRef.current) {
      setDistanceFromTop(
        window.pageYOffset + containerRef.current.getBoundingClientRect().top
      )
    }
  }, [containerRef, headerHeight])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const cssVars = {
    '--top': distanceFromTop.toFixed(2),
    '--scroll': scrollY.toFixed(2),
    '--screen-h': height.toFixed(2),
  } as React.CSSProperties

  /** todo resize image */
  return (
    <div ref={containerRef} className={s.imgContainer} style={cssVars}>
      <img
        className={s.img}
        src={img.src}
        alt={img.alt ? img.alt : 'Alt of the image'}
      />
    </div>
  )
}
