import { ICoupon } from '@thatmemories/yup';
import { formatDistanceStrict, isAfter } from 'date-fns';
import { Schema, model } from 'mongoose';

const couponSchema = new Schema<ICoupon>(
  {
    name: {
      type: String,
      default: 'No name coupon',
    },
    couponCode: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      default: 'draft',
    },
    discountUnit: String,
    discountAmount: Number,
    isFreeshipping: Boolean,
    minimumOrder: Number,
    maximumOrder: Number,
    couponQuantity: Number,
    usedCoupons: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      default: Date.now(),
    },
    endDate: {
      type: Date,
      default: Date.now() + 30 * 24 * 60 * 60 * 1000,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.__v;
        delete ret.updatedAt;
      },
    },
  },
);

couponSchema.virtual('zeroCouponsLeft').get(function () {
  let zeroCouponsLeft = false;

  if (this.couponQuantity === this.usedCoupons) {
    zeroCouponsLeft = true;
  }

  return zeroCouponsLeft;
});

couponSchema.virtual('isExpired').get(function () {
  if (!this.endDate) return false;
  return isAfter(new Date(), new Date(this.endDate));
});

couponSchema.virtual('expiredIn').get(function () {
  if (this.startDate && isAfter(new Date(this.startDate), new Date())) {
    return 'scheduled';
  }

  if (!this.endDate) return 'never expired';

  if (isAfter(new Date(), this.endDate)) return 'expired';

  return 'in ' + formatDistanceStrict(new Date(this.endDate), new Date());
});

const Coupon = model<ICoupon>('coupon', couponSchema);

export { couponSchema, Coupon };
