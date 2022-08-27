import { getBaseApiUrl, extractAttr } from '@utils/index'
import { IJewelryProduct } from '@interfaces/index'

export default function convertStrapiJeweleryToJewelry(
  apiItem: any
): IJewelryProduct {
  const product = apiItem.attributes
  const id = apiItem.id
  const optionnalFields = {} as any
  console.log(extractAttr(product.primaryImg).url)
  if(product?.secondaryImg?.data) {
    optionnalFields.secondaryImg = {
      src: `${
        extractAttr(product.secondaryImg).url
      }`,
      alt: extractAttr(product.secondaryImg).alternativeText,
    }
  }

  return {
    id,
    primaryImg: {
      src: `${extractAttr(product.primaryImg).url}`,
      alt: extractAttr(product.primaryImg).alternativeText,
    },
    type: 'jewelry',
    description: product.description,
    details: product.details,
    title: product.name,
    price: product.price,
    currency: product.currency,
    colors: product.colors.data.map(
      (colorData: any) => colorData.attributes.name
    ),
    collection: extractAttr(product.collection).name,
    strapiProductId: product.strapiProductId,
    ...optionnalFields,
  } as IJewelryProduct
}
