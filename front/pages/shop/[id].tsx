import { ProductsList, PageLayout, Text } from '@components'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import Head from 'next/head'
import Image from 'next/image'
import s from './styles.module.scss'
import { Product } from '@components'
import { IJewelryProduct, IProduct } from '@interfaces/index'

const product: IJewelryProduct = {
  id: '1',
  primaryImg: {
    src: '/product-recto.webp',
    alt: 'alt text',
  },
  secondaryImg: {
    src: '/product-verso.webp',
    alt: 'alt text',
  },
  type: 'jewelry',
  title: 'Product 1',
  price: 180,
  currency: '$',
  meta: {
    colors: ['gold', 'silver'],
    collection: 'ERA Collection',
  },
  description:
    'I am a product description. I am a great place to add more details about me.',
  details:
    "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
}

const ShopOneProduct: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <PageLayout>
        <Product product={product} />
      </PageLayout>
    </>
  )
}

export default ShopOneProduct
