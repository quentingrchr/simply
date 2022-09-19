import React, { useEffect, useContext } from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { useSetRecoilState, useRecoilValue } from 'recoil'

// Components
import { Cart, Icon, Button } from '@components'
import Modal from '../index'

// Contexts
import { CartContext } from '@context/cart'
// Recoil
import { activeModalState } from '@recoil/modal/atom'
import { scrollDisabledState } from '@recoil/scroll/atom'

import { MODAL_CART_ID } from '@recoil/modal/atom'
// Utils
import { getTotalPrice, getPriceFromCurrency } from '@utils/index'

// Data
import cart from '@data/cart.json'

// Types
import { ICartItem } from '@interfaces/index'

export type IProps = {}

const CartItems = cart.data as ICartItem[]

export default function CartModal(props: IProps) {
  const activeModal = useRecoilValue(activeModalState)
  const setActiveModal = useSetRecoilState(activeModalState)
  const setScrollDisabled = useSetRecoilState(scrollDisabledState)
  const { dispatch, cart } = useContext(CartContext)

  const handleClose = () => {
    setActiveModal((s) => null)
    setScrollDisabled(false)
  }

  return (
    <Modal
      id={MODAL_CART_ID}
      HPosition="end"
      animation="fade"
      animationDuration={0.4}
    >
      <div
        className={cn(s.cart, { [s.isOpen]: activeModal === MODAL_CART_ID })}
      >
        <div className={s.header}>
          <div className={s.headerIcon} onClick={() => handleClose()}>
            <Icon type="chevron-left" color="white" size="sm" />
          </div>
          <p className={s.headerTitle}>Cart</p>
        </div>
        <div className={s.body}>
          <Cart items={cart.items} />
        </div>
        <div className={s.preFooter}>
          <div className={s.subTotal}>
            <p className={s.subTotalTitle}>Subtotal</p>
            <p className={s.subTotalPrice}>
              {getPriceFromCurrency(getTotalPrice(cart.items), '$')}
            </p>
          </div>
        </div>
        <div className={s.footer}>
          <div className={s.ctaContainer}>
            <Button fullWidth variant="primaryLight" to="/cart">
              View Cart
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
