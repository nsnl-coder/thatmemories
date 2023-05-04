import { Schema } from 'mongoose';
import { InferType, array, boolean, mixed, object, string } from 'yup';
import { shippingAddressSchema } from '../shared/shippingAddressSchema';

const RegisterUserSchema = object({
  email: string().email().max(150).lowercase().label('email').required(),
  isPinned: boolean().label('isPinned'),
  fullname: string().min(6).max(255).lowercase().label('fullname'),
  phone: string()
    .matches(/^[0-9]{9,16}$/, 'Please provide valid phone number')
    .label('Phone number'),
  shippingAddress: array().of(shippingAddressSchema),
  password: string().min(8).max(255).label('password').required(),
  profileImage: string().max(255).label('profileImage'),
});

const updateUserSchema = RegisterUserSchema.pick([
  'fullname',
  'phone',
  'shippingAddress',
  'profileImage',
]).shape({
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

const updateUserEmailSchema = RegisterUserSchema.pick(['password']).shape({
  newEmail: string().email().max(150).lowercase().label('email').required(),
});

const updateUserPasswordSchema = RegisterUserSchema.pick(['password']).shape({
  newPassword: string().min(8).max(255).label('password').required(),
});

const forgotPasswordSchema = RegisterUserSchema.pick(['email']);
const resetPasswordSchema = RegisterUserSchema.pick(['password']);
const loginUserSchema = RegisterUserSchema.pick(['email', 'password']);

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
  RegisterUserSchema,
  updateUserSchema,
  updateUserEmailSchema,
  updateUserPasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginUserSchema,
};
export type { IUser };

export type LoginUserPayload = InferType<typeof loginUserSchema>;
export type CreateUserPayload = InferType<typeof RegisterUserSchema>;
export type UpdateUserPayload = InferType<typeof updateUserSchema>;
export type UpdateUserEmailPayload = InferType<typeof updateUserEmailSchema>;
export type UpdateUserPasswordPayload = InferType<
  typeof updateUserPasswordSchema
>;
export type ForgotPasswordPayload = InferType<typeof forgotPasswordSchema>;
export type ResetPasswordPayload = InferType<typeof resetPasswordSchema>;
