import { createFileUrlSchema } from '@thatmemories/yup';
import express from 'express';
import { requireLogin, requireRole } from 'express-common-middlewares';
import * as filesController from '../controllers/fileController';
import validateRequest from '../middlewares/validateRequest';
import { User } from '../models/userModel';
import parseReqQuery from '../middlewares/parseReqQuery';

const router = express.Router();
router.use(requireLogin(User));
router.use(requireRole('admin'));

router.post(
  '/presigned-url',
  validateRequest(createFileUrlSchema),
  filesController.createPresignedUrl,
);

router.get('/', parseReqQuery, filesController.getManyFiles);
router.delete('/delete-one-file', filesController.deleteFile);
router.delete('/', filesController.deleteManyFiles);

export default router;
