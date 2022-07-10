import React from 'react'
import cn from 'classnames'
import Link from 'next/link'

import { Button } from '@components'
import s from './styles.module.scss'
import { IBasicImage } from '@interfaces/index'

interface ISubSection {
  title?: string
  wysiwyg: string
}
export interface IProps {
  variant?:
    | 'primary'
    | 'primaryLight'
    | 'secondary'
    | 'secondaryLight'
    | 'tertiary'
  subSections?: ISubSection[]
  className?: string
}

export default function BigSection({
  subSections,
  variant = 'primary',
  className = '',
}: IProps) {
  return (
    <div className={cn(s.bigSection, s[variant], className)}>
      {subSections?.map(({ title, wysiwyg }, index) => {
        return (
          <div className={s.subSection} key={index}>
            {!!title && <h2 className={s.title}>{title}</h2>}
            {wysiwyg && (
              <div
                className={s.wysiwyg}
                dangerouslySetInnerHTML={{ __html: wysiwyg }}
              ></div>
            )}
          </div>
        )
      })}
    </div>
  )
}
