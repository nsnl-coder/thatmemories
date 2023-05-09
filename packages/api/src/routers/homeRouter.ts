import express from 'express';
import { requireLogin, requireRole } from 'express-common-middlewares';
import {
  createHomeSchema,
  updateHomeSchema,
  updateHomesSchema,
} from '@thatmemories/yup';
import * as homeController from '../controllers/homeController';
import getReqUser from '../middlewares/getReqUser';
import { User } from '../models/userModel';
import validateRequest from '../middlewares/validateRequest';
import parseReqQuery from '../middlewares/parseReqQuery';

const router = express.Router();

router.get('/current-home-page', homeController.getCurrentHomePage);

router.use(requireLogin(User));
router.use(requireRole('admin'));

router.get('/:id', homeController.getHome);

router.get('/', getReqUser(User), parseReqQuery, homeController.getManyHomes);

router.post('/', validateRequest(createHomeSchema), homeController.createHome);
router.put(
  '/:id',
  validateRequest(updateHomeSchema),
  homeController.updateHome,
);

router.put(
  '/',
  validateRequest(updateHomesSchema),
  homeController.updateManyHomes,
);

router.delete('/:id', homeController.deleteHome);
router.delete('/', homeController.deleteManyHomes);

export default router;
