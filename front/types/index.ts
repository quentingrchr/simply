import {
  RegisterOptions,
  UseFormRegisterReturn,
  Control,
} from 'react-hook-form'

export type ColorsType =
  | 'primary-light'
  | 'primary-dark'
  | 'secondary'
  | 'tertiary'
  | 'black'
  | 'white'
export type CurrencyType = '$' | '€'
export type IconsType =
  | 'cart'
  | 'chevron-up'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'coupon'
  | 'note'
  | 'plus-sign'
  | 'minus-sign'
  | 'cross'

export type JewelryColorType = 'silver' | 'gold'

export type UseFormRegisterFunctionType = (
  name: string,
  options?: RegisterOptions
) => UseFormRegisterReturn

export type UseFormControlFunctionType = Control
