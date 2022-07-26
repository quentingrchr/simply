import React from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { useFormContext } from 'react-hook-form'

export type IProps = {
  id: string
  type?: 'email' | 'text' | 'password'
  required?: boolean
}

export default function InputText({
  type = 'text',
  id,
  required = false,
}: IProps) {
  const methods = useFormContext()
  if (!methods) return null
  const { register } = methods
  return (
    <div className={s.container}>
      <input
        className={s.input}
        type={type}
        {...register(id, {
          required: required ? true : false,
        })}
      />
    </div>
  )
}
