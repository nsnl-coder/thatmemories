import express from 'express';
import { requireLogin, requireRole } from 'express-common-middlewares';
//
import {
  createContactSchema,
  updateContactSchema,
  updateContactsSchema,
} from '@thatmemories/yup';
import * as contactController from '../controllers/contactController';
import { User } from '../models/userModel';
import validateRequest from '../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(createContactSchema),
  contactController.createContact,
);

router.use(requireLogin(User));
router.use(requireRole('admin'));

router.get('/:id', contactController.getContact);
router.get('/', contactController.getManyContacts);

router.put(
  '/:id',
  validateRequest(updateContactSchema),
  contactController.updateContact,
);
router.put(
  '/',
  validateRequest(updateContactsSchema),
  contactController.updateManyContacts,
);

router.delete('/:id', contactController.deleteContact);
router.delete('/', contactController.deleteManyContacts);

export default router;
