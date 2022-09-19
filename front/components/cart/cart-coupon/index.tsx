import React, { useEffect, useState } from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { IconWithTextCta, Button } from '@components'

export type IProps = {}

export default function CartCoupon(props: IProps) {
  const [coupon, setCoupon] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<null | string>(null)

  function applyCoupon(coupon: string) {
    /* todo implement coupon check */
    /* for now just show error */
    setError('Invalid coupon')
  }

  useEffect(() => {
    if (!isOpen) {
      setCoupon('')
      setError(null)
    }
  }, [isOpen])

  return (
    <>
      <IconWithTextCta
        icon="coupon"
        text="Enter a coupon"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      />
      {isOpen && !!error && <p className={s.error}>{error}</p>}
      {isOpen && (
        <div className={s.inputContainer}>
          <input
            className={s.input}
            type="text"
            placeholder="Enter a coupon"
            onChange={(e) => setCoupon(e.target.value)}
          />
          <div className={s.buttonContainer}>
            <Button
              variant="primary"
              onClick={() => {
                applyCoupon(coupon)
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
