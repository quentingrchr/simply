import { CurrencyType } from '../types'

export default function getPriceWithCurrency(
  price: number,
  currency: CurrencyType
): string {
  switch (currency) {
    case '$':
      return `$${price.toFixed(2)}`
    case '€':
      return `${price.toFixed(2)}€`
    default:
      return `${price.toFixed(2)}`
  }
}
