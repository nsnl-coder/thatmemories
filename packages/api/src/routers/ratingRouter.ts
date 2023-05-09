import express from 'express';
import {
  checkIdExistence,
  requireLogin,
  requireOwnership,
  requireRole,
} from 'express-common-middlewares';
//
import {
  createRatingSchema,
  updateRatingSchema,
  updateRatingsSchema,
} from '@thatmemories/yup';
import * as ratingController from '../controllers/ratingController';
import parseReqQuery from '../middlewares/parseReqQuery';
import validateRequest from '../middlewares/validateRequest';
import { Product } from '../models/productModel';
import { Rating } from '../models/ratingModel';
import { User } from '../models/userModel';

const router = express.Router();

router.use(requireLogin(User));

router.post(
  '/',
  validateRequest(createRatingSchema),
  checkIdExistence('product', Product),
  ratingController.createRating,
);

router.put(
  '/:id',
  validateRequest(updateRatingSchema),
  requireOwnership(Rating),
  ratingController.updateRating,
);

router.delete('/:id', requireOwnership(Rating), ratingController.deleteRating);

// admin
router.use(requireRole('admin'));

router.get('/:id', ratingController.getRating);
router.get('/', parseReqQuery, ratingController.getManyRatings);

router.put(
  '/',
  validateRequest(updateRatingsSchema),
  ratingController.updateManyRatings,
);
router.delete('/', ratingController.deleteManyRatings);

export default router;
