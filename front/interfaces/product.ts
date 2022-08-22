import { CurrencyType } from '@types'
import { IBasicImage } from './'

export default interface IProduct {
  id: string
  primaryImg: IBasicImage
  secondaryImg: IBasicImage
  type: 'jewelry' | 'other'
  title: string
  price: number
  currency: CurrencyType
  description: string
  details: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  strapiProductId?: string
}
