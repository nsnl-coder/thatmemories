import express from 'express';
import { requireLogin, requireRole } from 'express-common-middlewares';

import {
  createCollectionSchema,
  updateCollectionSchema,
  updateCollectionsSchema,
} from '@thatmemories/yup';

import * as collectionController from '../controllers/collectionController';
import validateRequest from '../middlewares/validateRequest';
import { User } from '../models/userModel';
import parseReqQuery from '../middlewares/parseReqQuery';

const router = express.Router();

router.get('/:id', collectionController.getCollection);
router.get('/', parseReqQuery, collectionController.getManyCollections);

router.use(requireLogin(User));
router.use(requireRole('admin'));

router.post(
  '/',
  validateRequest(createCollectionSchema),
  collectionController.createCollection,
);

router.put(
  '/:id',
  validateRequest(updateCollectionSchema),
  collectionController.updateCollection,
);

router.put(
  '/',
  validateRequest(updateCollectionsSchema),
  collectionController.updateManyCollections,
);

router.delete('/:id', collectionController.deleteCollection);
router.delete('/', collectionController.deleteManyCollections);

export default router;
