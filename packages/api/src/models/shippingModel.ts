import { IShipping } from '@thatmemories/yup';
import { Schema, model } from 'mongoose';

const shippingSchema = new Schema<IShipping>(
  {
    display_name: String,
    fees: {
      type: Number,
      default: 0,
    },
    delivery_min: Number,
    delivery_max: Number,
    freeshipOrderOver: Number,
    status: {
      type: String,
      enum: ['draft', 'active'],
      default: 'draft',
    },
    delivery_estimation: {
      type: String,
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

const Shipping = model<IShipping>('shipping', shippingSchema);

export { shippingSchema, Shipping };
