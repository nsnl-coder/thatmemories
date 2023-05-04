// #insert__routers
import express from 'express';
import authRouter from './authRouter';
import collectionRouter from './collectionRouter';
import contactRouter from './contactRouter';
import couponRouter from './couponRouter';
import fileRouter from './fileRouter';
import homeRouter from './homeRouter';
import menuRouter from './menuRouter';
import orderRouter from './orderRouter';
import productRouter from './productRouter';
import ratingRouter from './ratingRouter';
import shippingRouter from './shippingRouter';
import stripeRouter from './stripeRouter';
import variantRouter from './variantRouter';

const router = express.Router();

// #use__routers
router.use('/api/homes', homeRouter);
router.use('/api/homes', homeRouter);
router.use('/api/stripe', stripeRouter);
router.use('/api/files', fileRouter);
router.use('/api/menus', menuRouter);
router.use('/api/ratings', ratingRouter);
router.use('/api/contacts', contactRouter);
router.use('/api/shippings', shippingRouter);
router.use('/api/coupons', couponRouter);
router.use('/api/orders', orderRouter);
router.use('/api/products', productRouter);
router.use('/api/variants', variantRouter);
router.use('/api/collections', collectionRouter);
router.use('/api/auth', authRouter);

export default router;
