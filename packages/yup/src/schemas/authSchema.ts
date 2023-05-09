import { InferType, array, boolean, mixed, object, string } from 'yup';
import { shippingAddressSchema } from '../shared/shippingAddressSchema';
import type { Schema } from 'mongoose';

const registerUserSchema = object({
  email: string().email().max(150).lowercase().label('email').required(),
  isPinned: boolean().label('isPinned'),
  fullname: string().min(6).max(255).lowercase().label('fullname'),
  phone: string()
    .matches(/^[0-9]{9,16}$/, 'Please provide valid phone number')
    .label('Phone number'),
  shippingAddress: shippingAddressSchema,
  password: string().min(8).max(255).label('password').required(),
  profileImage: string().max(255).label('profileImage'),
});

const updateUserSchema = registerUserSchema
  .pick(['fullname', 'phone', 'shippingAddress', 'profileImage'])
  .shape({
    password: mixed().test(
      'is-undefined',
      'use other route to update password',
      (value) => value === undefined,
    ),
    email: mixed().test(
      'is-undefined',
      'use other route to update email',
      (value) => value === undefined,
    ),
  });

const updateUserEmailSchema = registerUserSchema.pick(['password']).shape({
  newEmail: string().email().max(150).lowercase().label('email').required(),
});

const updateUserPasswordSchema = registerUserSchema.pick(['password']).shape({
  newPassword: string().min(8).max(255).label('password').required(),
});

const forgotPasswordSchema = registerUserSchema.pick(['email']);
const resetPasswordSchema = registerUserSchema.pick(['password']);
const loginUserSchema = registerUserSchema.pick(['email', 'password']);

interface IUser extends CreateUserPayload {
  _id: Schema.Types.ObjectId;
  role: 'user' | 'customer' | 'admin' | 'root';
  isVerified: boolean;
  password: string;
  passwordChangedAt?: Date;
  resetPasswordEmailSentAt: Date;
  verifyEmailSentAt: Date | undefined;
  verifyEmailsSent: number | undefined;
  resetPasswordEmailsSent: number;
}

export {
  registerUserSchema,
  updateUserSchema,
  updateUserEmailSchema,
  updateUserPasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginUserSchema,
};
export type { IUser };

export type LoginUserPayload = InferType<typeof loginUserSchema>;
export type CreateUserPayload = InferType<typeof registerUserSchema>;
export type UpdateUserPayload = InferType<typeof updateUserSchema>;
export type UpdateUserEmailPayload = InferType<typeof updateUserEmailSchema>;
export type UpdateUserPasswordPayload = InferType<
  typeof updateUserPasswordSchema
>;
export type ForgotPasswordPayload = InferType<typeof forgotPasswordSchema>;
export type ResetPasswordPayload = InferType<typeof resetPasswordSchema>;
