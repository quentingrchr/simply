import React, { useContext } from 'react'
import s from './styles.module.scss'
import axios from 'axios'

import { useForm, FormProvider } from 'react-hook-form'
import cn from 'classnames'
import { IJewelryProduct, IProduct } from '@interfaces/index'
import { JewelryColorType } from '@types'
import { loadStripe } from '@stripe/stripe-js'
import {
  getPriceFromCurrency,
  productToCartItem,
  getStripe,
} from '@utils/index'
import { CartContext } from '@context/cart'
import { ADD_ITEM } from '@context/cart/action'
import {
  Button,
  ExpansionPanel,
  Slider,
  InputColor,
  InputNumber,
  ExpansionPanelGroup,
} from '@components'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export type IProps = {
  product: IJewelryProduct
  returnPolicy?: string
}

type ColorsTextMapKeys = JewelryColorType

const colorsTextMap: {
  [key in ColorsTextMapKeys]: string
} = {
  gold: 'Gold',
  silver: 'Silver',
}

export default function Product({ product, returnPolicy }: IProps) {
  const { dispatch } = useContext(CartContext)
  const methods = useForm({
    defaultValues: {
      ['color' as string]: product.colors[0] as JewelryColorType,
      ['quantity' as string]: 1,
    },
  })
  const { watch, register, handleSubmit } = methods

  async function handleBuyNow(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (!stripePromise) return
    try {
      const res = await axios.post('/api/checkout_session', {
        products: [
          {
            id_stripe: product.strapiProductId,
            name: product,
            quantity: 1,
          },
        ],
      })
      const { sessionId, url } = res.data
      /* redirect to checkout */
      const stripe = await stripePromise
      const { error } = await stripe!.redirectToCheckout({
        sessionId,
      })
      if (error) {
        console.log(error, 'error')
      }
    } catch (err) {
      console.log(err, 'err')
    }
  }

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
          <div className={s.id}>
            SKU: {product.id.toString().padStart(4, '0')}
          </div>
          <h1 className={s.title}>{product.title}</h1>
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
                  const quantity = watch('quantity') as number
                  const color = watch('color') as JewelryColorType

                  dispatch({
                    type: ADD_ITEM,
                    payload: {
                      item: productToCartItem(product, color, quantity),
                    },
                  })
                }}
                fullWidth
              >
                Add to cart
              </Button>
              <Button
                variant="primaryLight"
                onClick={(e: any) => {
                  handleBuyNow(e)
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
              <p className={s.description}>{product.details}</p>
            </ExpansionPanel>
            {!!returnPolicy && (
              <ExpansionPanel
                title="Return & Refund Policy"
                titleVariant="caudex"
                borderPosition="bottom"
              >
                <p className={s.description}>{returnPolicy}</p>
              </ExpansionPanel>
            )}
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
