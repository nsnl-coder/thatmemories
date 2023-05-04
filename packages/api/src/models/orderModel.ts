import { IOrder } from '@thatmemories/yup';
import { Schema, model } from 'mongoose';

const orderSchema = new Schema<IOrder>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    orderNumber: Number,
    subTotal: Number,
    grandTotal: Number,
    items: [
      {
        productName: String,
        price: Number,
        quantity: {
          type: Number,
          default: 1,
        },
        photos: [String],
        variants: [
          {
            variantName: String,
            optionName: String,
          },
        ],
      },
    ],
    fullname: String,
    email: String,
    phone: String,
    shipping: {
      name: String,
      fees: Number,
    },
    discount: {
      inDollar: Number,
      inPercent: Number,
      couponCode: String,
    },
    shippingStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'arrived'],
      default: 'pending',
    },
    shippingAddress: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      postal_code: String,
      country: String,
    },
    notes: String,
    paymentStatus: {
      type: String,
      enum: ['canceled', 'payment_failed', 'succeeded', 'processing'],
      default: 'processing',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const Order = model<IOrder>('order', orderSchema);

export { orderSchema, Order };
