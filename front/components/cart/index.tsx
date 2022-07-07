import React from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { ICartItem } from '@interfaces/index'
import { useForm, FormProvider } from 'react-hook-form'

import Item from './item'

export type IProps = {
  items?: ICartItem[]
  variant?: 'simple' | 'advanced'
}

const data: Array<ICartItem> = []

export default function Cart({ variant = 'simple', items = data }: IProps) {
  const methods = useForm()

  console.log({ methods })
  console.log({ form: methods.watch() })
  return (
    <FormProvider {...methods}>
      <div className={s.list}>
        {items.map((p) => (
          <div className={s.item} key={p.id}>
            <Item
              id={p.id}
              currency={p.currency}
              img={p.img}
              price={p.price}
              quantity={p.quantity}
              title={p.title}
              variant={variant}
              collection={p.collection}
              color={p.color}
            />
          </div>
        ))}
      </div>
    </FormProvider>
  )
}
