import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import s from './styles.module.scss'
import { ProductsList, PageLayout, Text, Product } from '@components'
import { getBaseApiUrl, convertStrapiJeweleryToJewelry, extractAttr} from '@utils/index'
import { IJewelryProduct, IProduct } from '@interfaces/index'


interface IProps {
  product: IJewelryProduct
  returnPolicy?: string
}

const ShopOneProduct: NextPage<IProps> = ({ product, returnPolicy }) => {
  const router = useRouter()

  return (
    <>
      <PageLayout>
        <Product product={product} returnPolicy={returnPolicy} />
      </PageLayout>
    </>
  )
}

export async function getServerSideProps({ params }: any) {
  console.warn(params.id, 'ID')
  const productRes = await fetch(
    `${getBaseApiUrl()}/jewelries/${params.id}?populate=*`
  )

  const returnPolicyRes = await fetch(
    `${getBaseApiUrl()}/global-data?populate=*`
  )

  let returnPolicy = null
  
  const productData = await productRes.json()
  const returnPolicyData = await returnPolicyRes.json()
  const product = convertStrapiJeweleryToJewelry(productData.data)
  if(!!returnPolicyData.data) {
    returnPolicy = extractAttr(returnPolicyData).returnPolicy
  }

  return {
    props: {
      product,
      returnPolicy
    },
  }
}

export default ShopOneProduct
