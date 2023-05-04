import { IRating } from '@thatmemories/yup';
import { Schema, model } from 'mongoose';

const ratingSchema = new Schema<IRating>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    stars: {
      type: Number,
    },
    content: {
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

const Rating = model<IRating>('rating', ratingSchema);

export { ratingSchema, Rating };
