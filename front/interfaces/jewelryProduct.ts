import { IProduct } from './'
import { JewelryColorType } from '@types'

export default interface IJewelryProduct extends IProduct {
  meta: {
    colors: JewelryColorType[]
    collection: string
  }
}
