import React, { useContext } from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { ICartItem } from '@interfaces/index'

import { Text, Button } from '@components'
import { useForm, FormProvider } from 'react-hook-form'

// Context

import Item from './item'

type VariantType = 'simple' | 'advanced'

export type IProps = {
  items?: ICartItem[]
  variant?: VariantType
}

const data: Array<ICartItem> = []

const EmptyCard = ({ variant }: { variant?: VariantType }) => {
  return (
    <div className={cn(s.empty, s[variant])}>
      <Text type="paragraph" color="black">
        Looks like your cart is empty
      </Text>
      {variant === 'advanced' && (
        <Button variant="primaryLight" to="/shop">
          Start shopping
        </Button>
      )}
    </div>
  )
}

export default function Cart({ variant = 'simple', items = data }: IProps) {
  const methods = useForm()
  const isEmpty = items.length === 0

  return (
    <FormProvider {...methods}>
      {isEmpty ? (
        <EmptyCard variant={variant} />
      ) : (
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
      )}
    </FormProvider>
  )
}
