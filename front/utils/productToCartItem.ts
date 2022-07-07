import { ICartItem, IProduct, IJewelryProduct } from '@interfaces'

import { JewelryColorType } from '@types'
function jeweleryToCartItem(
  product: IJewelryProduct,
  color: JewelryColorType,
  quantity: number
): ICartItem {
  return {
    id: product.id,
    img: {
      src: product.primaryImg.src,
      alt: product.primaryImg.alt || 'Alternative text',
    },
    title: product.title,
    quantity,
    price: product.price,
    currency: product.currency,
    color,
    collection: product.collection,
  }
}
export default function productToCartItem(
  product: IProduct,
  color: JewelryColorType,
  quantity: number
): ICartItem {
  if (product.type === 'jewelry') {
    return jeweleryToCartItem(product as IJewelryProduct, color, quantity)
  } else {
    throw new Error('Unknown product type')
  }
}
