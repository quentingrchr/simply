// Vendors
import React from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { useFormContext } from 'react-hook-form'

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
  const isAdvanced = variant === 'advanced'
  const handleDelete = () => {
    alert('delete')
  }
  return (
    // @todo add link to /product/${id}
    <div className={cn(s.cartItem, s[variant])}>
      <div className={s.left}>
        <div className={s.leftDelete} onClick={handleDelete}>
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
          <div className={s.rightDelete} onClick={handleDelete}>
            <Icon color="black" type="cross" size="xs" />
          </div>
        </div>
      </div>
    </div>
  )
}
