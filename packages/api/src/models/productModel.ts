import { IProduct } from '@thatmemories/yup';
import { model, Schema } from 'mongoose';
import slugify from 'slugify';
import { variantSchema } from './variantModel';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      default: 'unnamed product',
    },
    slug: {
      type: String,
      default: 'unnamed-product',
    },
    status: String,
    overview: {
      type: String,
    },
    description: String,
    isPinned: Boolean,
    price: {
      type: Number,
      default: 0,
    },
    discountPrice: {
      type: Number,
    },
    images: [String],
    previewImages: [String],
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'collection',
      },
    ],
    variants: [variantSchema],
    // side effect
    numberOfRatings: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 0,
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

productSchema.pre('save', function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

productSchema.pre(/(updateMany|findOneAndUpdate)/, function (next) {
  // @ts-ignore
  const payload = this.getUpdate() as IProduct;

  if (payload && payload.name) {
    payload.slug = slugify(payload.name, { lower: true });
  }

  next();
});

const Product = model<IProduct>('product', productSchema);

export { productSchema, Product };
