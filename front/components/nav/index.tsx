import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useLayoutEffect,
} from 'react'
import cn from 'classnames'
import Link from 'next/link'
import s from './styles.module.scss'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'

import { activeModalState } from '@recoil/modal/atom'
import { headerHeightState } from '@recoil/header/atom'
import { scrollDisabledState } from '@recoil/scroll/atom'
import { CartContext } from '@context/cart'
import { Icon, Logo, BurgerIcon } from '@components'

import { MODAL_CART_ID } from '@recoil/modal/atom'

// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser.
const canUseDOM: boolean = !!(
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
)
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect
interface IProps {
  route: string
  hasBg?: boolean
}

const mainLinks = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/shop',
    label: 'Shop',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/contact',
    label: 'Contact',
  },
]

export default function Nav({ hasBg, route }: IProps) {
  const setHeaderHeight = useSetRecoilState(headerHeightState)
  const setActiveModal = useSetRecoilState(activeModalState)
  const setScrollDisabled = useSetRecoilState(scrollDisabledState)
  const [burgerIsOpen, setBurgerIsOpen] = useState(false)
  const { cart } = useContext(CartContext)
  const navRef = useRef<any>(null)

  useIsomorphicLayoutEffect(() => {
    if (navRef.current) {
      setHeaderHeight(navRef.current.offsetHeight)
    }
  }, [navRef, setHeaderHeight])

  const openCartModal = () => {
    setActiveModal(MODAL_CART_ID)
  }

  const openBurger = () => {
    setBurgerIsOpen(true)
    setScrollDisabled(true)
  }

  const closeBurger = () => {
    setBurgerIsOpen(false)
    setScrollDisabled(false)
  }

  const handleBurgerClick = () => {
    burgerIsOpen ? closeBurger() : openBurger()
  }

  return (
    <nav ref={navRef} className={cn(s.nav, { [s.noBg]: !hasBg })}>
      {/* Burger menu */}
      <div className={cn(s.burgerMenu, { [s.open]: burgerIsOpen })}>
        <div className={s.burgerMenuHeader}></div>
        <ul className={s.burgerMenuList}>
          {mainLinks.map((item) => (
            <li
              key={item.label}
              className={cn(s.navItem, { [s.active]: route == item.href })}
              onClick={closeBurger}
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* End of burger menu */}

      {/* Top nav */}
      <div className={s.navWrapper}>
        <div className={s.navLeft}>
          <div className={s.burgerIcon} onClick={handleBurgerClick}>
            <BurgerIcon isOpen={burgerIsOpen} />
          </div>

          <ul className={s.navList}>
            {mainLinks.map((item) => (
              <li
                key={item.label}
                className={cn(s.navItem, { [s.active]: route == item.href })}
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.navCenter}>
          <Logo tag="h1" />
        </div>
        <div className={s.navRight}>
          <div className={s.navItem} onClick={openCartModal}>
            <Icon type="cart" size="md" color={hasBg ? 'white' : 'black'} />
            <span className={s.cartQuantity}>{cart.items.length}</span>
          </div>
          <div className={s.navItem}>
            <Link href="/login">Log In</Link>
          </div>
        </div>
      </div>
      {/* End of top nav */}
    </nav>
  )
}
