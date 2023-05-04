import express from 'express';
import {
  checkIdExistence,
  requireLogin,
  requireRole,
} from 'express-common-middlewares';

//
import {
  createProductSchema,
  updateProductSchema,
  updateProductsSchema,
} from '@thatmemories/yup';
import * as productController from '../controllers/productController';
import getReqUser from '../middlewares/getReqUser';
import validateRequest from '../middlewares/validateRequest';
import { Collection } from '../models/collectionModel';
import { User } from '../models/userModel';

const router = express.Router();

router.get('/random', productController.getRandomProducts);

router.get('/:id', productController.getProduct);

router.get('/', getReqUser(User), productController.getManyProducts);

router.use(requireLogin(User));
router.use(requireRole('admin'));

router.post(
  '/',
  validateRequest(createProductSchema),
  checkIdExistence('collections', Collection),
  productController.createProduct,
);

router.put(
  '/:id',
  validateRequest(updateProductSchema),
  checkIdExistence('collections', Collection),
  productController.updateProduct,
);
router.put(
  '/',
  validateRequest(updateProductsSchema),
  checkIdExistence('collections', Collection),
  productController.updateManyProducts,
);

router.delete('/:id', productController.deleteProduct);
router.delete('/', productController.deleteManyProducts);

export default router;
