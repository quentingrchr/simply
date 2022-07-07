import React, { Children, useEffect } from 'react'
import s from './styles.module.scss'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { activeModalState } from '@recoil/modal/atom'
import { scrollDisabledState } from '@recoil/scroll/atom'

import cn from 'classnames'

export type IProps = {
  id: string
  children: any
  HPosition?: 'center' | 'start' | 'end'
  animation?: 'fade' | 'none'
  animationDuration?: number
}

export default function Modal({
  id,
  children,
  HPosition = 'center',
  animation = 'none',
  animationDuration = 0.3,
}: IProps) {
  const activeModal = useRecoilValue(activeModalState)
  const setActiveModal = useSetRecoilState(activeModalState)
  const setScrollDisabled = useSetRecoilState(scrollDisabledState)

  const cssVars = {
    '--animation-duration': `${animationDuration}s`,
  } as React.CSSProperties

  function closeModal() {
    setActiveModal((s) => {
      return null
    })
    setScrollDisabled(false)
  }

  useEffect(() => {
    if (activeModal === id) {
      setScrollDisabled(true)
    }
  }, [activeModal])

  return (
    <div
      className={cn(
        s.modalContainer,
        { [s.active]: activeModal === id },
        s[HPosition],
        s[animation]
      )}
      style={cssVars}
    >
      <div onClick={closeModal} className={s.modalOverlay}></div>
      <div className={cn(s.modalWrapper)}>{children}</div>
    </div>
  )
}
