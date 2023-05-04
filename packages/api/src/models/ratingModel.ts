import { IRating } from '@thatmemories/yup';
import { Schema, model } from 'mongoose';

interface IRatingWithObjectId extends Omit<IRating, 'product' | 'createdBy'> {
  createdBy: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
}

const ratingSchema = new Schema<IRatingWithObjectId>(
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

const Rating = model<IRatingWithObjectId>('rating', ratingSchema);
export { ratingSchema, Rating };
