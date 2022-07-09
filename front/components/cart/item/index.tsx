// Vendors
import React, { useContext } from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { useFormContext } from 'react-hook-form'

// Context
import { CartContext } from '@context/cart'
import { REMOVE_ITEM } from '@context/cart/action'

//Interfaces
import { ICartItem } from '@interfaces/index'

// Utils
import getPriceFromCurrency from '@utils/getPriceWithCurrency'

// Components
import { InputNumber } from '@components/inputs'
import { Icon } from '@components'

export interface IProps extends ICartItem {
  variant: 'simple' | 'advanced'
}

export default function Item({
  id,
  img,
  title,
  quantity,
  price,
  color,
  currency,
  collection,
  variant,
}: IProps) {
  const { dispatch } = useContext(CartContext)
  const isAdvanced = variant === 'advanced'
  const handleDelete = (id: string) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } })
  }
  return (
    // @todo add link to /product/${id}
    <div className={cn(s.cartItem, s[variant])}>
      <div className={s.left}>
        <div className={s.leftDelete} onClick={() => handleDelete(id)}>
          <Icon color="black" type="cross" size="xxs" />
        </div>
        <img className={s.img} src={img.src} alt={img.alt || ''} />
        <div className={s.infos}>
          <p className={s.title}>{title}</p>
          <div className={s.secondaryInfos}>
            <p className={s.secondaryInfo}>
              {getPriceFromCurrency(price, currency)}
            </p>
            {color && isAdvanced && (
              <p className={s.secondaryInfo}>Color : {color}</p>
            )}
          </div>
          <div className={s.quantityInfo}>
            <InputNumber
              variant="small"
              name={`${id}-quantity`}
              defaultValue={quantity}
              min={0}
              max={1000}
            />
          </div>
        </div>
      </div>
      <div className={s.right}>
        <div className={s.rightAdvanced}>
          <p className={s.rightTotal}>
            {getPriceFromCurrency(price * quantity, currency)}
          </p>
          <div className={s.rightDelete} onClick={() => handleDelete(id)}>
            <Icon color="black" type="cross" size="xs" />
          </div>
        </div>
      </div>
    </div>
  )
}
