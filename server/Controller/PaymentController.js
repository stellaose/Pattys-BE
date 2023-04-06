import Stripe from "stripe";
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'

dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PaymentController = {
  processPayment: async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'gbp',
      metadata: {
        company: 'E-Commerce',
      }
    })
    
    res.json({
      status: 200,
      success: true,
      client_secret: myPayment.client_secret
    })
  },
  
  sendStripeKey: async (req, res, next) => {
    res.json({
      status: 200,
      stripeApiKey: process.env.STRIPE_API_KEY
    })
  }
}

export default PaymentController