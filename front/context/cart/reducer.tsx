import { ICarteState } from '.'
import { ICartItem } from '@interfaces'
import {
  ADD_ITEM,
  CLEAR_CART,
  DECREMENT_ITEM,
  INCREMENT_ITEM,
  REMOVE_ITEM,
  SET_CART,
  ActionType,
} from './action'

interface IAction {
  type: ActionType
  payload?: any
}

export default function cartReducer(
  state: ICarteState,
  action: IAction
): ICarteState {
  switch (action.type) {
    case ADD_ITEM:
      let { item } = action.payload as { item: ICartItem }
      const isAlreadyInCart = state.items.some(
        (cartItem: ICartItem) => cartItem.id === item.id
      )
      if (isAlreadyInCart) {
        return {
          ...state,
          items: state.items.map((cartItem: ICartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          ),
        }
      } else {
        return {
          ...state,
          items: [...state.items, { ...item }],
        }
      }

    case REMOVE_ITEM:
      const { id } = action.payload as { id: string }
      console.log(id)
      return {
        ...state,
        items: state.items.filter((cartItem: ICartItem) => cartItem.id !== id),
      }

    case CLEAR_CART:
      return {
        ...state,
        items: [],
      }

    case INCREMENT_ITEM:
      return {
        ...state,
        items: state.items.map((cartItem: ICartItem) => {
          if (cartItem.id === action.payload.itemId) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + action.payload.incrementValue,
            }
          }
          return cartItem
        }),
      }

    case DECREMENT_ITEM:
      const decrementedItem = state.items.find(
        (item) => item.id === action.payload.itemId
      )
      if (!decrementedItem) return state
      if (decrementedItem.quantity - action.payload.decrementValue === 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.id !== action.payload.itemId
          ),
        }
      } else {
        return {
          ...state,
          items: state.items.map((cartItem: ICartItem) => {
            if (cartItem.id === action.payload.itemId) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - action.payload.decrementValue,
              }
            }
            return cartItem
          }),
        }
      }

    case SET_CART:
      return {
        ...state,
        items: action.payload as ICartItem[],
      }

    default:
      return state
  }
}
