// cart react context
import React, { createContext, useState, useEffect, useReducer } from 'react'
import reducer from './reducer'
import { ICartItem } from '@interfaces'

export interface ICarteState {
  items: ICartItem[]
}

export const CartContext = createContext({})

interface ICartContextProps {
  children: React.ReactNode
}

export const CartContextProvider = ({ children }: ICartContextProps) => {
  const [cart, dispatch] = useReducer(reducer, {} as ICarteState)

  useEffect(() => {
    // store in local storage
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    // load from local storage
    const cart = localStorage.getItem('cart')
    if (cart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(cart) })
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        dispatch,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
