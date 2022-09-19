import React, { useEffect, useContext } from 'react'
import s from './styles.module.scss'
import cn from 'classnames'

// Components
import { ProductFilters, Icon, Button } from '@components'
import Modal from '../index'

// Contexts
import { CartContext } from '@context/cart'
// Recoil
import { activeModalState } from '@recoil/modal/atom'
import { scrollDisabledState } from '@recoil/scroll/atom'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import { PRODUCT_LIST_FILTERS } from '@recoil/modal/atom'

// Types
import { ICartItem } from '@interfaces/index'
import { SActiveFilters, CLEAR_ALL } from '../../products-list/filterReducer'

export type IProps = {
  activeFilter: SActiveFilters
  collectionsItems: any
  prices: any
  colorsItems: any
  dispatch: any
}

export default function ProductListFiltersModal(props: IProps) {
  const activeModal = useRecoilValue(activeModalState)
  const setActiveModal = useSetRecoilState(activeModalState)
  const setScrollDisabled = useSetRecoilState(scrollDisabledState)

  const closeModal = () => {
    setActiveModal((s) => null)
    setScrollDisabled(false)
  }

  const CloseIcon = () => <Icon type="cross" size="xs" color="black" onClick={closeModal} />
  return (
    <Modal
      id={PRODUCT_LIST_FILTERS}
      HPosition="end"
      animation="fade"
      animationDuration={0.4}
    >
      <div
        className={cn(s.cart, {
          [s.isOpen]: activeModal === PRODUCT_LIST_FILTERS,
        })}
      >
        <div className={s.body}>
          <ProductFilters {...props} headerIcon={<CloseIcon />} />
        </div>
      </div>
    </Modal>
  )
}
