import { atom } from 'recoil'

export const MODAL_CART_ID = 'MODAL_CART_ID'

type activeModalType = null | string
type modalDataType = null | Object
export const activeModalState = atom({
  key: 'activeModal',
  default: null as activeModalType,
})

export const modalDataState = atom({
  key: 'modalData',
  default: {
    data: null as modalDataType,
  },
})
