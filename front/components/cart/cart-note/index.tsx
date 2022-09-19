import React, { useState } from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { IconWithTextCta } from '@components'

export type IProps = {}

export default function CartNote(props: IProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <IconWithTextCta
        icon="note"
        text="Add a note"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      />

      {isOpen && (
        <div className={s.noteInputContainer}>
          <textarea className={s.noteInput}>Your note here</textarea>
        </div>
      )}
    </>
  )
}
