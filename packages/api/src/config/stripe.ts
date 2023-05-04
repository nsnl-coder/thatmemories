import { IOrder } from '@thatmemories/yup';
import type { Response } from 'express';
import Stripe from 'stripe';
import createError from '../utils/createError';

const createStripeClient = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    console.log('Can not read stripe secret key from .env');
    return;
  }
  const stripe = new Stripe(secretKey, {
    typescript: true,
    apiVersion: '2022-11-15',
  });

  return stripe;
};

const createPaymentIntent = async (res: Response, order: IOrder) => {
  const stripe = createStripeClient();

  if (!stripe) {
    throw createError('Unexpected error happen!');
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.floor(order.grandTotal * 100),
    currency: 'usd',
    receipt_email: order.email,
    shipping: {
      name: order.fullname || order.email!,
      address: {
        line1: order.shippingAddress.line1,
        line2: order.shippingAddress.line2 || undefined,
        country: order.shippingAddress.country,
        city: order.shippingAddress.city,
        postal_code: order.shippingAddress.postal_code,
      },
      phone: order.phone,
    },
    metadata: {
      orderId: order._id!.toString(),
      orderNumber: order.orderNumber,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return paymentIntent.client_secret;
};

export default createStripeClient;
export { createPaymentIntent };
