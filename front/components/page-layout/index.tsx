import React, { useEffect, useState } from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { headerHeightState } from '@recoil/header/atom'
import { scrollDisabledState } from '@recoil/scroll/atom'
import { Nav, CartModal, Footer } from '@components'

export type IProps = {
  children: React.ReactNode
  hasHero?: boolean
}

export default function PageLayout({ hasHero = false, children }: IProps) {
  const headerHeight = useRecoilValue(headerHeightState)
  const scrollDisabled = useRecoilValue(scrollDisabledState)
  const { route } = useRouter()
  useEffect(() => {
    console.log(
      'This website is used for educational purposes only. You can find the source code here https://github.com/quentingrchr/simply'
    )
  }, [])

  const cssVars = { '--nav-height': `${headerHeight}px` } as React.CSSProperties

  return (
    <div style={cssVars} className={cn({ [s.noScroll]: scrollDisabled })}>
      <header>
        <Nav hasBg={hasHero} route={route} />
      </header>
      <main className={cn({ [s.noHeroLayout]: !hasHero })}>
        {children}
        <Footer />
      </main>
      <CartModal />
    </div>
  )
}
