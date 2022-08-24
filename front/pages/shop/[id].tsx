import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import s from './styles.module.scss'
import { ProductsList, PageLayout, Text, Product } from '@components'
import { getBaseApiUrl, convertStrapiJeweleryToJewelry } from '@utils/index'
import { IJewelryProduct, IProduct } from '@interfaces/index'

interface IProps {
  product: IJewelryProduct
}

const ShopOneProduct: NextPage<IProps> = ({ product }) => {
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

export async function getServerSideProps({ params }: any) {
  console.warn(params.id, 'ID')
  const res = await fetch(
    `${getBaseApiUrl()}/jewelries/${params.id}?populate=*`
  )
  const apiData = await res.json()
  console.log({apiData});
  const product = convertStrapiJeweleryToJewelry(apiData.data)
  return {
    props: {
      product,
    },
  }
}

export default ShopOneProduct
