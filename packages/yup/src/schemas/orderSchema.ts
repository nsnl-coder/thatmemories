import { Schema } from 'mongoose';
import { InferType, array, number, object, string } from 'yup';
import { shippingAddressSchema } from '../shared/shippingAddressSchema';
import { updateList } from '../shared/updateList';
import { IUser } from './authSchema';
import { IProduct } from './productSchema';

const itemSchema = object({
  product: string().length(24).required(),
  quantity: number().max(999).default(1),
  selectedOptions: array().of(string().length(24).required()),
});

interface ICreateOrderPayloadItem
  extends Omit<InferType<typeof itemSchema>, 'product'> {
  product: Pick<
    IProduct,
    'name' | 'price' | 'slug' | 'variants' | 'discountPrice' | 'previewImages'
  >;
}

const createOrderSchema = object({
  items: array()
    .of(itemSchema)
    .min(1, 'Your order need to have at least one item!')
    .label('Order items'),
  couponCode: string().max(255).label('Discount code'),
  notes: string().max(255).label('Order note'),
  email: string().email().max(150).lowercase().label('email'),
  fullname: string().max(255).label('Full name'),
  phone: string()
    .matches(/^\+?[0-9]{9,16}$/, 'Please provide valid phone number')
    .label('Phone number'),
  shippingAddress: shippingAddressSchema,
  shippingMethod: string().length(24).required(),
  grandTotal: number().min(0).max(99999),
});

const updateOrderSchema = createOrderSchema
  .pick(['fullname', 'notes', 'phone', 'shippingAddress', 'email'])
  .shape({
    shippingStatus: string().oneOf([
      'pending',
      'processing',
      'shipped',
      'arrived',
    ]),
    paymentStatus: string().oneOf([
      'canceled',
      'payment_failed',
      'succeeded',
      'processing',
      'refunded',
    ]),
  });

const updateOrdersSchema = updateOrderSchema.concat(updateList);

interface IOrderItem {
  productName: string;
  price: number;
  quantity: number;
  photos: string[];
  variants: { variantName?: string; optionName?: string }[];
}

interface IOrder
  extends Omit<
    InferType<typeof createOrderSchema>,
    'items' | 'shippingMethod'
  > {
  _id: string;
  createdBy: Schema.Types.ObjectId;
  items: IOrderItem[];
  orderNumber: number;
  subTotal: number;
  grandTotal: number;
  discount: {
    inDollar: number;
    inPercent: number;
    couponCode: string;
  };

  shipping: {
    name: string;
    fees: number;
  };
  shippingStatus: 'pending' | 'processing' | 'shipped' | 'arrived';
  paymentStatus:
    | 'canceled'
    | 'payment_failed'
    | 'succeeded'
    | 'processing'
    | 'refunded';
}

interface IPopulatedOrder extends Omit<IOrder, 'createdBy'> {
  createdBy: IUser;
}

export { createOrderSchema, updateOrderSchema, updateOrdersSchema };
export type { IOrder, IPopulatedOrder, IOrderItem, ICreateOrderPayloadItem };

export type CreateOrderPayload = InferType<typeof createOrderSchema>;
export type UpdateOrderPayload = InferType<typeof updateOrderSchema>;
export type UpdateOrdersPayload = InferType<typeof updateOrdersSchema>;
