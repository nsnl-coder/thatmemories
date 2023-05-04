import {
  RegisterUserSchema,
  forgotPasswordSchema,
  loginUserSchema,
  resetPasswordSchema,
  updateUserEmailSchema,
  updateUserPasswordSchema,
  updateUserSchema,
} from '@thatmemories/yup';
import express from 'express';

//
import * as authController from '../controllers/authController';
import requireLogin from '../middlewares/requireLogin';
import validateRequest from '../middlewares/validateRequest';
import { User } from '../models/userModel';

const router = express.Router();

router.post('/sign-out', authController.signOut);

router.post(
  '/sign-up',
  validateRequest(RegisterUserSchema),
  authController.signUp,
);

/**
 * handle email verification
 */
router.post('/verify-email/:token', authController.verifyEmail);

router.post(
  '/forgot-password',
  validateRequest(forgotPasswordSchema),
  authController.forgotPassword,
);

router.put(
  '/reset-password/:token',
  validateRequest(resetPasswordSchema),
  authController.resetPassword,
);

router.post(
  '/sign-in',
  validateRequest(loginUserSchema),
  authController.signIn,
);

//
router.get(
  '/current-user',
  requireLogin(User, { verifiedUserOnly: false }),
  authController.getCurrentUser,
);

router.post(
  '/resend-verify-email',
  requireLogin(User, { verifiedUserOnly: false }),
  authController.resendVerifyEmail,
);

// verified logged in user only
router.use(requireLogin(User));

router.put(
  '/update-email',
  validateRequest(updateUserEmailSchema),
  authController.updateEmail,
);

router.put(
  '/update-password',
  validateRequest(updateUserPasswordSchema),
  authController.updatePassword,
);

router.put(
  '/update-user-info',
  validateRequest(updateUserSchema),
  authController.updateUserInfo,
);

export default router;
