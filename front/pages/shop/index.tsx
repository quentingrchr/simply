import { ProductsList, PageLayout, Text, PageHead } from '@components'
import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import s from './styles.module.scss'
import {
  getBaseApiUrl,
  convertStrapiJeweleryToJewelry,
  extractAttr,
} from '@utils/index'
import { IJewelryProduct, IStrapiMetaComponent } from '@interfaces/index'

const fakeProducts: Array<IJewelryProduct> = [
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

interface IProps {
  products: Array<IJewelryProduct>
  topText?: string
  pageMeta: IStrapiMetaComponent
}

const Shop: NextPage<IProps> = ({ products, topText, pageMeta }) => {
  const methods = useForm()

  return (
    <>
      <PageHead meta={pageMeta} />
      <PageLayout>
        <div className={s.header}>
          <div className={s.headerContent}>
            <Text color="black" type="h-uppercase">
              Shop All
            </Text>
            {!!topText && (
              <Text color="black" type="paragraph">
                {topText}
              </Text>
            )}
          </div>
        </div>
        {/* <FormProvider {...methods}> */}
        <ProductsList products={products} />
        {/* </FormProvider> */}
      </PageLayout>
    </>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const jewelriesRes = await fetch(`${getBaseApiUrl()}/jewelries?populate=*`)
  const jewelriesData = await jewelriesRes.json()
  const products = jewelriesData.data.map((apiItem: any): IJewelryProduct => {
    return convertStrapiJeweleryToJewelry(apiItem)
  })

  const pageRes = await fetch(`${getBaseApiUrl()}/shop-page?populate=*`)
  const pageData = await pageRes.json()
  const topText = extractAttr(pageData).topText
  const pageMeta = extractAttr(pageData).meta
  console.log(pageMeta)
  // Pass data to the page via props
  return {
    props: {
      products,
      topText,
      pageMeta,
    },
  }
}

export default Shop
