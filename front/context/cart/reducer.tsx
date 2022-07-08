import { ICarteState } from '.'
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
      return state

    case REMOVE_ITEM:
      return state

    case CLEAR_CART:
      return state

    case INCREMENT_ITEM:
      return state

    case DECREMENT_ITEM:
      return state

    case SET_CART:
      return action.payload

    default:
      return state
  }
}
