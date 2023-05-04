import express from 'express';
import {
  checkIdExistence,
  requireLogin,
  requireOwnership,
  requireRole,
} from 'express-common-middlewares';
//
import {
  createOrderSchema,
  updateOrderSchema,
  updateOrdersSchema,
} from '@thatmemories/yup';
import * as orderController from '../controllers/orderController';
import validateRequest from '../middlewares/validateRequest';
import { Order } from '../models/orderModel';
import { Shipping } from '../models/shippingModel';
import { User } from '../models/userModel';

const router = express.Router();

router.use(requireLogin(User));

router.get('/:id', requireOwnership(Order), orderController.getOrder);

router.post(
  '/',
  validateRequest(createOrderSchema),
  checkIdExistence('shippingOption', Shipping),
  orderController.createOrder,
);

router.use(requireRole('admin'));
router.get('/', orderController.getManyOrders);

router.put(
  '/:id',
  validateRequest(updateOrderSchema),
  orderController.updateOrder,
);
router.put(
  '/',
  validateRequest(updateOrdersSchema),
  orderController.updateManyOrders,
);

router.delete('/:id', orderController.deleteOrder);
router.delete('/', orderController.deleteManyOrders);

export default router;
