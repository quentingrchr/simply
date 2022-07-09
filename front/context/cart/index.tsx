// cart react context
import React, { createContext, useState, useEffect, useReducer } from 'react'
import * as CART_ACTIONS from './action'
import reducer from './reducer'
import { ICartItem } from '@interfaces'

export interface ICarteState {
  items: ICartItem[]
}

export const CartContext = createContext({
  cart: {
    items: [],
  } as ICarteState,
  dispatch: (a: any) => {},
})

interface ICartContextProps {
  children: React.ReactNode
}

export const CartContextProvider = ({ children }: ICartContextProps) => {
  const [cart, dispatch] = useReducer(reducer, {
    items: [],
  } as ICarteState)

  useEffect(() => {
    // store in local storages
    sessionStorage.setItem('cart', JSON.stringify(cart))
    console.log(cart)
  }, [cart])

  useEffect(() => {
    // load from local storage
    const cart = sessionStorage.getItem('cart')
    const cartLength = cart ? JSON.parse(cart).items.length : 0
    if (cart && cartLength > 0) {
      dispatch({ type: CART_ACTIONS.SET_CART, payload: JSON.parse(cart).items })
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        dispatch,
        cart: cart as ICarteState,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
