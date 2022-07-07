import { atom } from 'recoil'
import { ICartItem } from '@interfaces'
import { recoilPersist } from 'recoil-persist'

export interface ICarteState {
  items: Array<ICartItem>
}

const { persistAtom } = recoilPersist()

export const cartState = atom({
  key: 'cartState',
  default: null as ICarteState | null,
  effects_UNSTABLE: [persistAtom],
})
