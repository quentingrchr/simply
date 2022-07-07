import { CurrencyType } from '@types'
import { IBasicImage } from '@interfaces/index'

export default interface ICartItem {
  id: string
  img: IBasicImage
  title: string
  quantity: number
  price: number
  currency: CurrencyType
  color: string
  collection: string
}
