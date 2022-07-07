import React from 'react'
import { useController, useFormContext } from 'react-hook-form'
import s from './styles.module.scss'
import cn from 'classnames'
import { Icon } from '@components'

export type IProps = {
  name: string
  variant?: 'classic' | 'small'
  required?: boolean
  min?: number
  max?: number
  defaultValue?: number
}

export default function InputNumber({
  name,
  min = 1,
  max = 9,
  required = false,
  defaultValue = 1,
  variant = 'classic',
}: IProps) {
  const { control } = useFormContext()
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    rules: { required: required },
    defaultValue: defaultValue,
  })

  console.log({ control, value, onChange })

  function increase() {
    if (parseInt(value) < max - 1) onChange(parseInt(value) + 1)
  }

  function decrease() {
    if (parseInt(value) > min + 1) onChange(parseInt(value) - 1)
  }

  if (variant === 'small') {
    return (
      <div className={s.container}>
        <span className={s.cta} onClick={decrease}>
          <Icon type="minus-sign" color="black" size="xs" position="center" />
        </span>
        <input
          className={s.input}
          type="number"
          value={value}
          min={min}
          max={max}
        />
        <span className={s.cta} onClick={increase}>
          <Icon type="plus-sign" color="black" size="xs" position="center" />
        </span>
      </div>
    )
  } else if (variant === 'classic') {
    return (
      <div className={cn(s.container, s.classic)}>
        <input
          className={s.input}
          type="number"
          value={value}
          min={min}
          max={max}
        />
        <div className={s.sideControls}>
          <span className={s.cta} onClick={increase}>
            <Icon
              type="chevron-up"
              color="black"
              customSize={10}
              position="center"
            />
          </span>
          <span className={s.cta} onClick={decrease}>
            <Icon
              type="chevron-down"
              color="black"
              customSize={10}
              position="center"
            />
          </span>
        </div>
      </div>
    )
  } else {
    return null
  }
}
