import React, { useRef } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useInView } from 'framer-motion'

import { Button } from '@components'
import s from './styles.module.scss'
import { IBasicImage } from '@interfaces/index'

export interface IProps {
  variant?: 'primary' | 'primaryLight' | 'secondary' | 'tertiary'
  img?: IBasicImage
  title?: string
  subtitle?: string
  description?: string
  descriptions?: string[]
  className?: string
  button?: {
    text: string
    to?: string
    onClick?: () => void
    target?: string
  }
}
/* todo 
tranform this component into a component that accepts an array of items and renders them in the correct order
type of item: img / button / subtitle / title / description
*/
export default function SmallSection({
  button,
  description,
  descriptions,
  img,
  subtitle,
  title,
  variant = 'primary',
  className = '',
}: IProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-50%',
  })

  const buttonProps =
    button && button?.onClick
      ? { onClick: button?.onClick }
      : { to: button?.to, target: button?.target ? button?.target : '_blank' }
  return (
    <div ref={ref} className={cn(s.smallSection, s[variant], className, {
      [s.visible]: isInView,
    })}>
      {subtitle && <span className={s.subtitle}>{subtitle}</span>}
      {title && <h2 className={s.title}>{title}</h2>}
      {description && (
        <div className={s.descriptionContainer}>
          <p
            className={s.description}
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      )}
      {descriptions &&
        descriptions?.length > 0 &&
        descriptions?.map((d, i) => (
          <div className={s.descriptionContainer} key={i}>
            <p
              className={s.description}
              dangerouslySetInnerHTML={{ __html: d }}
            ></p>
          </div>
        ))}
      {img && (
        <div className={s.imgContainer}>
          <img
            className={s.img}
            src={img?.src}
            alt={img?.alt ? img.alt : 'Alt text of the image'}
          />
        </div>
      )}
      {button && (
        <div className={s.buttonContainer}>
          <Button variant={variant} {...buttonProps} fullWidth upperCase>
            {button.text}
          </Button>
        </div>
      )}
    </div>
  )
}
