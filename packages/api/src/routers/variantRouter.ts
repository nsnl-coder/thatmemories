import express from 'express';

//
import { createVariantSchema, updateVariantSchema } from '@thatmemories/yup';
import { requireLogin, requireRole } from 'express-common-middlewares';
import * as variantController from '../controllers/variantController';
import validateRequest from '../middlewares/validateRequest';
import { User } from '../models/userModel';

const router = express.Router();

router.use(requireLogin(User));
router.use(requireRole('admin'));

router.get('/:id', variantController.getVariant);
router.get('/', variantController.getManyVariants);

router.post(
  '/',
  validateRequest(createVariantSchema),
  variantController.createVariant,
);

router.put(
  '/:id',
  validateRequest(updateVariantSchema),
  variantController.updateVariant,
);
router.put(
  '/',
  validateRequest(updateVariantSchema),
  variantController.updateManyVariants,
);

router.delete('/:id', variantController.deleteVariant);
router.delete('/', variantController.deleteManyVariants);

export default router;
