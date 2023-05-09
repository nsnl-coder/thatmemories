import { IShippingAddress, IUser } from '@thatmemories/yup';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Schema, model } from 'mongoose';

const shippingSchema = new Schema<IShippingAddress>({
  line1: String,
  line2: String,
  city: String,
  state: String,
  postal_code: String,
  country: String,
});

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'customer', 'admin', 'root'],
    },
    isPinned: Boolean,
    profileImage: String,
    fullname: String,
    phone: String,
    shippingAddress: shippingSchema,
    password: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    resetPasswordEmailsSent: {
      type: Number,
      default: 0,
    },
    resetPasswordEmailSentAt: Date,
    verifyEmailSentAt: Date,
    verifyEmailsSent: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.passwordChangedAt;
        delete ret.__v;
        delete ret.verifyToken;
        delete ret.verifyTokenExpires;
        delete ret.verifyEmailsSent;
      },
    },
    timestamps: true,
  },
);

// hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return;

  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordChangedAt = new Date(Date.now() - 1000);
  }

  next();
});

//  create reset password token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = model<IUser>('user', userSchema);
export { User, userSchema };
