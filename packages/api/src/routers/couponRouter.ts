import {
  createCouponSchema,
  updateCouponSchema,
  updateCouponsSchema,
} from '@thatmemories/yup';
import express from 'express';
import { requireLogin, requireRole } from 'express-common-middlewares';
import * as couponController from '../controllers/couponController';
import { User } from '../models/userModel';
import validateRequest from '../middlewares/validateRequest';

const router = express.Router();

router.get('/:id', couponController.getCoupon);
router.post('/check-coupon-validity', couponController.checkCouponValidity);

router.use(requireLogin(User));
router.use(requireRole('admin'));

router.get('/', couponController.getManyCoupons);

router.post(
  '/',
  validateRequest(createCouponSchema),
  couponController.createCoupon,
);

router.put(
  '/:id',
  validateRequest(updateCouponSchema),
  couponController.updateCoupon,
);
router.put(
  '/',
  validateRequest(updateCouponsSchema),
  couponController.updateManyCoupons,
);

router.delete('/:id', couponController.deleteCoupon);
router.delete('/', couponController.deleteManyCoupons);

export default router;
