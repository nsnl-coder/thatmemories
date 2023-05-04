import { IVariant } from '@thatmemories/yup';
import { Schema, model } from 'mongoose';

const variantSchema = new Schema<IVariant>(
  {
    variantName: {
      type: String,
      default: 'default name',
    },
    options: [
      {
        optionName: {
          type: String,
          default: 'unnamed option',
        },
        photo: String,
        price: Number,
      },
    ],
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

const Variant = model<IVariant>('variant', variantSchema);

export { variantSchema, Variant };
