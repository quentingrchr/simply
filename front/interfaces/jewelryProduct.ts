import { IProduct } from './'
import { JewelryColorType } from '@types'

export default interface IJewelryProduct extends IProduct {
  colors: JewelryColorType[]
  collection: string
}
