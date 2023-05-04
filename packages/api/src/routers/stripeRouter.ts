import express, { NextFunction, Response } from 'express';
import validateStripeSignature, {
  StripeRequest,
} from '../middlewares/validateStripeSignature';
import { Order } from '../models/orderModel';

const router = express.Router();

router.post(
  '/webhooks',
  validateStripeSignature,
  async (req: StripeRequest, res: Response, next: NextFunction) => {
    const event = req.event;

    if (!event) {
      res.status(400).json({
        status: 'fail',
        message: 'fail to read stripe event',
      });
      return;
    }
    res.status(200).send('success');

    // @ts-ignore
    const orderId = event.data?.object?.metadata?.orderId;
    if (!orderId) return;

    let paymentStatus = 'processing';

    if (event.type === 'payment_intent.succeeded') {
      paymentStatus = 'succeeded';
    }

    if (event.type === 'payment_intent.canceled') {
      paymentStatus = 'canceled';
    }

    if (event.type === 'payment_intent.payment_failed') {
      paymentStatus = 'payment_failed';
    }

    if (paymentStatus !== 'processing') {
      await Order.findByIdAndUpdate(orderId, { paymentStatus });
    }
  },
);

export default router;
