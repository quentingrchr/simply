import type { NextApiRequest, NextApiResponse } from 'next'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
type Data = any



interface IProduct {
  id_stripe: string
  name?: string
  quantity: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    // get input 'product' from the form
    const { products } = req.body as { products: IProduct[] }
    // console.log(products, 'products');
    try {
      // Create Checkout Sessions from body params.
      const line_items = products.map((product: IProduct) => {
        return {
          price: product.id_stripe,
          quantity: product.quantity,
        }

      })
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      })
      res.send({ sessionId: session.id, url: session.url })

    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
