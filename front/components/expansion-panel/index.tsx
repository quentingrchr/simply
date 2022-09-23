import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { Icon } from '@components'

// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser.
const canUseDOM: boolean = !!(
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
)
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect

export type IProps = {
  children?: React.ReactNode
  title: string
  titleVariant?: 'avenir' | 'caudex'
  borderPosition?: 'top' | 'bottom'
  items?: [
    {
      id: string
      content: string
      onClick?: () => void
    }
  ]
  disabled?: boolean
}

export default function ExpansionPanel({
  title,
  children,
  items,
  disabled = false,
  titleVariant = 'avenir',
  borderPosition = 'top',
}: IProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [height, setHeight] = useState<number | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.offsetHeight)
      setIsOpen(false)
    }
  }, [contentRef])

  const cssVars = {
    '--height': `${isOpen ? height : '0'}px`,
  } as React.CSSProperties

  function toggle() {
    if (disabled) return
    setIsOpen(!isOpen)
  }

  function filter(onClick: (s: string) => {}, collection: string) {
    // filter takes a custom function that will pass the string to the dispatch function
    if (onClick) {
      onClick(collection)
    }
  }

  return (
    <div
      className={cn(
        s.expansionPanel,
        { [s.visible]: height !== null },
        s[borderPosition]
      )}
      style={height !== null ? cssVars : {}}
    >
      <div className={s.header} onClick={toggle}>
        <span className={cn(s.title, s[titleVariant])}>{title}</span>
        <span className={s.icon}>
          {isOpen ? (
            <Icon type="minus-sign" color="black" size="xs" />
          ) : (
            <Icon type="plus-sign" color="black" size="xs" />
          )}
        </span>
      </div>
      <div ref={contentRef} className={s.content}>
        <div className={s.childrenContainer}>
          {children ? children : null}
          {items
            ? items.map((item: any, index: number) => {
                return (
                  <div
                    className={cn(s.item, { [s.active]: item.active })}
                    key={index}
                    onClick={() =>
                      filter(item.onClick, item.active ? 'NONE' : item.id)
                    }
                  >
                    {item.content}
                  </div>
                )
              })
            : null}
        </div>
      </div>
    </div>
  )
}
