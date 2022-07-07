import React from 'react'
import s from './styles.module.scss'
import { useForm, FormProvider } from 'react-hook-form'
import cn from 'classnames'
import { IJewelryProduct, IProduct } from '@interfaces/index'
import { JewelryColorType } from '@types'
import { getPriceFromCurrency, productToCartItem } from '@utils/index'
import {
  Button,
  ExpansionPanel,
  Slider,
  InputColor,
  InputNumber,
  ExpansionPanelGroup,
} from '@components'

const PANELS = []

export type IProps = {
  product: IJewelryProduct
}

type ColorsTextMapKeys = JewelryColorType

const colorsTextMap: {
  [key in ColorsTextMapKeys]: string
} = {
  gold: 'Gold',
  silver: 'Silver',
}

export default function Product({ product }: IProps) {
  const methods = useForm({
    defaultValues: {
      ['color' as string]: product.colors[0] as JewelryColorType,
      ['quantity' as string]: 1,
    },
  })
  const { watch, register, handleSubmit } = methods

  let images = [product.primaryImg]
  if (product.secondaryImg) {
    images.push(product.secondaryImg)
  }

  return (
    <FormProvider {...methods}>
      <div className={s.container}>
        <section className={s.left}>
          <Slider images={images} />
        </section>
        <section className={s.right}>
          <div className={s.id}>SKU: 0019</div>
          <h1 className={s.title}>I'm a product</h1>
          <div className={s.price}>
            {getPriceFromCurrency(product.price, product.currency)}
          </div>
          <div className={s.meta}>
            <div className={s.metaFieldset}>
              <div className={s.metaLabel}>
                Color: {colorsTextMap[watch('color') as JewelryColorType]}
              </div>
              <InputColor colors={product.colors} name={'color'} />
            </div>
            <div className={s.metaFieldset}>
              <div className={s.metaLabel}>Quantity</div>
              <InputNumber
                name="quantiy"
                variant="classic"
                max={1000}
                min={1}
              />
            </div>

            <div className={s.buttons}>
              <Button
                variant="primaryLight"
                onClick={() => {
                  // todo dipsatch add to cart the following return
                  // productToCartItem(product, 'gold', 1)
                }}
                fullWidth
              >
                Add to cart
              </Button>
              <Button
                variant="primaryLight"
                onClick={() => {
                  console.log('Buy now the following product', {
                    id: product.id,
                    // img: IBasicImage @todo 1 or 2 images ?
                    title: product.title,
                    price: product.price,
                    currency: product.currency,
                    ...watch(),
                  })
                }}
                fullWidth
              >
                Buy now
              </Button>
            </div>
          </div>
          <p className={s.description}>{product.description}</p>
          <div className={s.secondaryInfos}>
            <ExpansionPanel
              title="Product Info"
              titleVariant="caudex"
              borderPosition="bottom"
            >
              <p className={s.description}>
                I'm a product detail. I'm a great place to add more information
                about your product such as sizing, material, care and cleaning
                instructions. This is also a great space to write what makes
                this product special and how your customers can benefit from
                this item.
              </p>
            </ExpansionPanel>
            <ExpansionPanel
              title="Return & Refund Policy"
              titleVariant="caudex"
              borderPosition="bottom"
            >
              <p className={s.description}>
                I’m a Return and Refund policy. I’m a great place to let your
                customers know what to do in case they are dissatisfied with
                their purchase. Having a straightforward refund or exchange
                policy is a great way to build trust and reassure your customers
                that they can buy with confidence.
              </p>
            </ExpansionPanel>
            <ExpansionPanel
              title="Shipping Info"
              titleVariant="caudex"
              borderPosition="bottom"
            >
              <p className={s.description}>
                I'm a shipping policy. I'm a great place to add more information
                about your shipping methods, packaging and cost. Providing
                straightforward information about your shipping policy is a
                great way to build trust and reassure your customers that they
                can buy from you with confidence.
              </p>
            </ExpansionPanel>
          </div>
        </section>
      </div>
    </FormProvider>
  )
}
