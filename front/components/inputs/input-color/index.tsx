import React from 'react'
import s from './styles.module.scss'
import cn from 'classnames'

import { useFormContext, useController } from 'react-hook-form'

import { JewelryColorType } from '@types'

export type IProps = {
  colors: JewelryColorType[]
  name?: string
  fullWidth?: boolean
  required?: boolean
}

export default function InputColor({
  colors = ['gold', 'silver'],
  name = 'color',
  fullWidth = false,
  required = false,
}: IProps) {
  const { control } = useFormContext()
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    rules: { required: required },
  })

  return (
    <div className={cn(s.container, { [s.fullWidth]: fullWidth })}>
      <fieldset className={s.choices}>
        {colors.map((color) => {
          return (
            <label
              key={color}
              className={cn(s.choice, s[color], {
                [s.active]: value === color,
              })}
              onClick={() => onChange(color)}
              htmlFor={color}
            >
              <input type="radio" id={color} name={name} value={color}></input>
            </label>
          )
        })}
      </fieldset>
    </div>
  )
}
