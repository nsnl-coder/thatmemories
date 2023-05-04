import express from 'express';
import { requireLogin, requireRole } from 'express-common-middlewares';
//
import {
  createMenuSchema,
  updateMenuSchema,
  updateMenusSchema,
} from '@thatmemories/yup';
import * as menuController from '../controllers/menuController';
import { User } from '../models/userModel';
import validateRequest from '../middlewares/validateRequest';

const router = express.Router();

router.get('/', menuController.getManyMenus);

router.use(requireLogin(User));
router.use(requireRole('admin'));

router.post('/', validateRequest(createMenuSchema), menuController.createMenu);

router.get('/:id', menuController.getMenu);

router.put(
  '/:id',
  validateRequest(updateMenuSchema),
  menuController.updateMenu,
);

router.put(
  '/',
  validateRequest(updateMenusSchema),
  menuController.updateManyMenus,
);

router.delete('/:id', menuController.deleteMenu);
router.delete('/', menuController.deleteManyMenus);

export default router;
