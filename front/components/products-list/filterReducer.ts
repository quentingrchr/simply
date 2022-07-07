import { IJewelryProduct } from '@interfaces/index'
import { JewelryColorType } from '@types'

export type FiltersType =
  | 'FILTER_COLLECTION'
  | 'FILTER_PRICE'
  | 'FILTER_COLOR'
  | 'CLEAR_ALL'
export type TypeFilteredProducts = Array<IJewelryProduct>
export interface IAction {
  type: FiltersType
  payload?: any
}
export interface SActiveFilters {
  collection: string | undefined
  color: JewelryColorType | undefined
  price:
    | {
        min: number
        max: number
      }
    | undefined
}

export const FILTER_COLLECTION = 'FILTER_COLLECTION'
export const FILTER_PRICE = 'FILTER_PRICE'
export const FILTER_COLOR = 'FILTER_COLOR'
export const CLEAR_ALL = 'CLEAR_ALL'

export function filterReducer(
  state: SActiveFilters,
  action: IAction
): SActiveFilters {
  switch (action.type) {
    case 'FILTER_COLLECTION':
      if (action.payload === 'NONE') {
        return { ...state, collection: undefined }
      } else {
        return { ...state, collection: action.payload }
      }

    case 'FILTER_COLOR':
      if (action.payload === 'NONE') {
        return { ...state, color: undefined }
      } else {
        return { ...state, color: action.payload }
      }

    case 'FILTER_PRICE':
      if (action.payload === 'NONE') {
        return { ...state, price: undefined }
      } else {
        return { ...state, price: action.payload }
      }
    case 'CLEAR_ALL':
      return {
        ...state,
        collection: undefined,
        color: undefined,
        price: undefined,
      }

    default:
      return state
  }
}
