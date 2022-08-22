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

interface IProps {
  products: Array<IJewelryProduct>
  topText?: string
  pageMeta: IStrapiMetaComponent
}

const Shop: NextPage<IProps> = ({ products, topText, pageMeta }) => {
  const methods = useForm()

  return (
    <>
      {!!pageMeta && <PageHead meta={pageMeta} />}
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
        {!!products && <ProductsList products={products} />}

        {/* </FormProvider> */}
      </PageLayout>
    </>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  try {
    const jewelriesRes = await fetch(`${getBaseApiUrl()}/jewelries?populate=*`)
    const jewelriesData = await jewelriesRes.json()
    let products
    if (jewelriesData.length > 0) {
      products = jewelriesData.data.map((apiItem: any): IJewelryProduct => {
        return convertStrapiJeweleryToJewelry(apiItem)
      })
    }

    const pageRes = await fetch(`${getBaseApiUrl()}/shop-page?populate=*`)
    const pageData = await pageRes.json()
    const topText = pageData ? extractAttr(pageData).topText : null
    const pageMeta = pageData ? extractAttr(pageData).meta : null

    // Pass data to the page via props
    return {
      props: {
        products,
        topText,
        pageMeta,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      props: {
        products: [],
        topText: null,
        pageMeta: null,
      },
    }
  }
}

export default Shop
