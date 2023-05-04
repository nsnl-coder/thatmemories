import express from 'express';
import { requireLogin, requireRole } from 'express-common-middlewares';
//
import {
  createShippingSchema,
  updateShippingSchema,
  updateShippingsSchema,
} from '@thatmemories/yup';
import * as shippingController from '../controllers/shippingController';
import getReqUser from '../middlewares/getReqUser';
import { User } from '../models/userModel';
import validateRequest from '../middlewares/validateRequest';

const router = express.Router();

router.get('/', getReqUser(User), shippingController.getManyShippings);

router.use(requireLogin(User));
router.use(requireRole('admin'));

router.get('/:id', shippingController.getShipping);

router.post(
  '/',
  validateRequest(createShippingSchema),
  shippingController.createShipping,
);

router.put(
  '/:id',
  validateRequest(updateShippingSchema),
  shippingController.updateShipping,
);
router.put(
  '/',
  validateRequest(updateShippingsSchema),
  shippingController.updateManyShippings,
);

router.delete('/:id', shippingController.deleteShipping);
router.delete('/', shippingController.deleteManyShippings);

export default router;
