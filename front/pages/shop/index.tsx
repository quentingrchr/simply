import { ProductsList, PageLayout, Text } from '@components'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useForm, FormProvider } from 'react-hook-form'
import Image from 'next/image'
import s from './styles.module.scss'
import { IJewelryProduct } from '@interfaces/index'

const data: Array<IJewelryProduct> = [
  {
    id: '1',
    primaryImg: {
      src: './product-recto.webp',
      alt: 'alt text',
    },
    secondaryImg: {
      src: './product-verso.webp',
      alt: 'alt text',
    },
    type: 'jewelry',
    description:
      'I am a product description. I am a great place to add more details about me.',
    details:
      'I am a product details. I am a great place to add more details about me.',
    title: 'Product 1',
    price: 180,
    currency: '$',
    meta: {
      colors: ['gold', 'silver'],
      collection: 'ERA Collection',
    },
  },
  {
    id: '2',
    primaryImg: {
      src: './product-recto.webp',
      alt: 'alt text',
    },
    secondaryImg: {
      src: './product-verso.webp',
      alt: 'alt text',
    },
    type: 'jewelry',
    description:
      'I am a product description. I am a great place to add more details about me.',
    details:
      'I am a product details. I am a great place to add more details about me.',
    title: 'Product 2',
    price: 500,
    currency: '$',
    meta: {
      colors: ['gold', 'silver'],
      collection: 'CRATER Collection',
    },
  },
  {
    id: '3',
    primaryImg: {
      src: './product-recto.webp',
      alt: 'alt text',
    },
    secondaryImg: {
      src: './product-verso.webp',
      alt: 'alt text',
    },
    type: 'jewelry',
    description:
      'I am a product description. I am a great place to add more details about me.',
    details:
      'I am a product details. I am a great place to add more details about me.',
    title: 'Product 3',
    price: 90,
    currency: '$',
    meta: {
      colors: ['gold', 'silver'],
      collection: 'ARC Collection',
    },
  },
  {
    id: '4',
    primaryImg: {
      src: './product-recto.webp',
      alt: 'alt text',
    },
    secondaryImg: {
      src: './product-verso.webp',
      alt: 'alt text',
    },
    type: 'jewelry',
    description:
      'I am a product description. I am a great place to add more details about me.',
    details:
      'I am a product details. I am a great place to add more details about me.',
    title: 'Product 4',
    price: 120,
    currency: '$',
    meta: {
      colors: ['gold', 'silver'],
      collection: 'Sale',
    },
  },
  {
    id: '5',
    primaryImg: {
      src: './product-recto.webp',
      alt: 'alt text',
    },
    secondaryImg: {
      src: './product-verso.webp',
      alt: 'alt text',
    },
    type: 'jewelry',
    description:
      'I am a product description. I am a great place to add more details about me.',
    details:
      'I am a product details. I am a great place to add more details about me.',
    title: 'Product 5',
    price: 340,
    currency: '$',
    meta: {
      colors: ['gold', 'silver'],
      collection: 'ARC Collection',
    },
  },
  {
    id: '6',
    primaryImg: {
      src: './product-recto.webp',
      alt: 'alt text',
    },
    secondaryImg: {
      src: './product-verso.webp',
      alt: 'alt text',
    },
    type: 'jewelry',
    description:
      'I am a product description. I am a great place to add more details about me.',
    details:
      'I am a product details. I am a great place to add more details about me.',
    title: 'Product 5',
    price: 140,
    currency: '$',
    meta: {
      colors: ['gold', 'silver'],
      collection: 'Sale',
    },
  },
]

const Shop: NextPage = () => {
  const methods = useForm()

  return (
    <>
      <PageLayout>
        <Head>
          <title>Simply - Our products </title>
        </Head>
        <div className={s.header}>
          <div className={s.headerContent}>
            <Text color="black" type="h-uppercase">
              Shop All
            </Text>
            <Text color="black" type="paragraph">
              I'm a paragraph. Click here to add your own text and edit me. It’s
              easy. Just click “Edit Text” or double click me to add your own
              content and make changes to the font.
            </Text>
          </div>
        </div>
        {/* <FormProvider {...methods}> */}
        <ProductsList products={data} />
        {/* </FormProvider> */}
      </PageLayout>
    </>
  )
}

export default Shop
