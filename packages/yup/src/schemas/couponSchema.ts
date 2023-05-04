import { InferType, boolean, date, number, object, string } from 'yup';
import { updateList } from '../shared/updateList';

const createCouponSchema = object({
  name: string().max(255).required(),
  couponCode: string().max(255).label('Coupon code').required(),
  status: string().oneOf(['draft', 'active']).label('Coupon status'),
  discountUnit: string().oneOf(['$', '%']).label('discountUnit').required(),
  discountAmount: number()
    .when('discountUnit', ([discountUnit], schema) =>
      discountUnit === '%'
        ? schema
            .min(0, 'Discount percentage should be greater than 1!')
            .max(100, 'Discount percentage should be less than 100!')
        : schema
            .min(0, 'Discount amount in dollar should be greater than 0')
            .max(9999, 'Discount amount in dollar should be less than 9999'),
    )
    .label('Discount amount')
    .required()
    .typeError('Discount must be a number.'),
  couponQuantity: number()
    .min(0)
    .max(9999)
    .label('Coupon quantity')
    .required()
    .typeError('Coupon quantity must be number!'),
  isFreeshipping: boolean(),
  minimumOrder: number()
    .min(0)
    .lessThan(100000)
    .typeError('Minimum order must be a number'),
  maximumOrder: number()
    .lessThan(100000)
    .when('minimumOrder', ([minimumOrder], schema) =>
      minimumOrder > 0
        ? schema
            .moreThan(
              minimumOrder,
              'Maximum order should be greater than minimum order!',
            )
            .required('Maximum order is required when specified minimum order!')
        : schema,
    )
    .typeError('Maxium order must be a number.'),
  startDate: date(),
  endDate: date()
    .when('startDate', ([startDate], schema) =>
      startDate
        ? schema
            .min(
              startDate,
              'The end date of coupon should be after the start date!',
            )
            .required('The end date is required when provided start date!')
        : schema,
    )
    .label('Coupon end date'),
});

const updateCouponSchema = createCouponSchema;
const updateCouponsSchema = createCouponSchema.concat(updateList);

const checkCouponValiditySchema = object({
  orderTotal: number().required(),
  couponCode: string().required(),
});

export interface ICoupon extends CreateCouponPayload {
  _id: string;
  usedCoupons: number;
  isExpired: boolean;
  expiredIn: string;
  zeroCouponsLeft: boolean;
}

export type CreateCouponPayload = InferType<typeof createCouponSchema>;
export type UpdateCouponPayload = CreateCouponPayload;
export type UpdateCouponsPayload = InferType<typeof updateCouponsSchema>;

export type CheckCouponValidityPayload = InferType<
  typeof checkCouponValiditySchema
>;

export {
  updateCouponSchema,
  createCouponSchema,
  checkCouponValiditySchema,
  updateCouponsSchema,
};
