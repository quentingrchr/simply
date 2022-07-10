import { useContext } from 'react'
import { Nav, Cart, IconWithTextCta, Button, PageLayout } from '@components'
import type { NextPage } from 'next'
import Head from 'next/head'
import { CartContext } from '@context/cart'
import s from './styles.module.scss'
import { ICartItem } from '@interfaces/index'
// Utils
import { getTotalPrice, getPriceFromCurrency } from '@utils/index'

const CartPage: NextPage = () => {
  const { cart } = useContext(CartContext)
  const cartIsEmpty = cart.items.length === 0
  return (
    <>
      <PageLayout>
        <main className={s.container}>
          <div className={s.cartContainer}>
            <div className={s.cartHeader}>
              <div className={s.headerTitle}>My cart</div>
            </div>
            <Cart items={cart.items} variant="advanced" />
            <div className={s.cartFooter}>
              <div className={s.cartFooterLink}>
                <IconWithTextCta icon="coupon" text="Enter a coupon" />
                <IconWithTextCta icon="note" text="Add a note" />
              </div>
            </div>
          </div>
          {!cartIsEmpty && (
            <div className={s.orderContainer}>
              <div className={s.orderHeader}>
                <div className={s.headerTitle}>Order summary</div>
                <div className={s.order}>
                  <div className={s.orderItem}>
                    <span>Subtotal</span>
                    <span>
                      {getPriceFromCurrency(getTotalPrice(cart.items), '$')}
                    </span>
                  </div>
                </div>
                <div className={s.orderFooter}>
                  <div className={s.orderTotal}>
                    <span>Total</span>
                    <span>
                      {getPriceFromCurrency(getTotalPrice(cart.items), '$')}
                    </span>
                  </div>
                  <div className={s.orderCta}>
                    <Button fullWidth variant="primaryLight" onClick={() => {}}>
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </PageLayout>
    </>
  )
}

export default CartPage
