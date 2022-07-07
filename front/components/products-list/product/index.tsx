import React from 'react'
import s from './styles.module.scss'
import Link from 'next/link'
import cn from 'classnames'

// Recoil
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { cartState, ICarteState } from '@recoil/cart/atom'

// Types
import { CurrencyType } from '../../../types'

// Utils
import { getPriceFromCurrency, productToCartItem } from '@utils/index'

export type IProps = {
  id: string
  primaryImg: {
    src: string
    alt?: string
  }
  secondaryImg: {
    src: string
    alt?: string
  }
  title: string
  price: number
  currency: CurrencyType
}

export default function Product(props: IProps) {
  const { id, primaryImg, secondaryImg, title, price, currency } = props
  const setCart = useSetRecoilState(cartState)

  return (
    <>
      <Link href={`/shop/${id}`}>
        <a className={s.productLinkWrapper}>
          <div className={s.product}>
            <div className={s.imgsContainer}>
              <span className={cn(s.border, s.borderLeft)}></span>
              <span className={cn(s.border, s.borderRight)}></span>
              <span className={cn(s.border, s.borderTop)}></span>
              <span className={cn(s.border, s.borderBottom)}></span>
              <div className={cn(s.imgContainer, s.imgContainerRecto)}>
                <img
                  src={primaryImg.src}
                  alt={primaryImg.alt ? primaryImg.alt : 'alt text'}
                />
              </div>
              <div className={cn(s.imgContainer, s.imgContainerVerso)}>
                <img
                  src={secondaryImg.src}
                  alt={secondaryImg.alt ? secondaryImg.alt : 'alt text'}
                />
              </div>
            </div>
            <div className={s.info}>
              <h2 className={s.title}>{`${title}`}</h2>
              <p className={s.price}>{getPriceFromCurrency(price, currency)}</p>
            </div>
          </div>
        </a>
      </Link>
    </>
  )
}
