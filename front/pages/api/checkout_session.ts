import type { NextApiRequest, NextApiResponse } from 'next'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
type Data = any

console.log(process.env.STRIPE_SECRET_KEY, 'clg')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req, 'req.body')
  console.log(req.headers.origin, 'req.headers.origin')
  if (req.method === 'POST') {
    // get input 'product' from the form
    const { productId } = req.body
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1LbS6XDuOAL277SLDIP1jQfL',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      })
      console.log(session, 'session')
      res.json({ id: session.id })
      // res.redirect(303, session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
