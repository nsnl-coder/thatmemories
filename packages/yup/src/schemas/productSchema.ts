import type { Schema } from 'mongoose';
import { InferType, array, boolean, number, object, string } from 'yup';
import { updateList } from '../shared/updateList';
import { ICollection } from './collectionSchema';
import { IVariant, createVariantSchema } from './variantSchema';

const createProductSchema = object({
  name: string().max(255).label('Product name'),
  status: string().oneOf(['draft', 'active']).label('Product status'),
  overview: string().max(10000).label('overview'),
  description: string().max(20000).label('description'),
  isPinned: boolean().label('isPinned'),
  price: number()
    .min(0)
    .max(99999)
    .label('price')
    .typeError('Price must be a number'),
  discountPrice: number()
    .when('price', ([price], schema) =>
      schema.max(price, 'Discount price must be smaller than current price'),
    )
    .label('discountPrice')
    .typeError('Discount price must be a number'),
  images: array()
    .max(20)
    .of(string().max(255).required())
    .label('Product images'),
  previewImages: array()
    .max(5)
    .of(string().min(1).max(255).required())
    .label('Preview images'),
  //
  variants: array().of(createVariantSchema).max(100).label('Product variants'),
  collections: array()
    .of(string().length(24).required())
    .max(100)
    .label('collections ids'),
});

const updateProductSchema = createProductSchema;
const updateProductsSchema = updateProductSchema.concat(updateList);

interface IProduct
  extends Omit<InferType<typeof createProductSchema>, 'variants'> {
  _id: Schema.Types.ObjectId;
  slug: string;
  numberOfRatings: number;
  ratingsAverage: number;
  variants: IVariant[];
}

interface IPopulatedProduct extends Omit<IProduct, 'collections'> {
  collections: ICollection[];
  variants: IVariant[];
}

export { createProductSchema, updateProductSchema, updateProductsSchema };
export type { IProduct, IPopulatedProduct };

export type CreateProductPayload = InferType<typeof createProductSchema>;
export type UpdateProductPayload = InferType<typeof updateProductSchema>;
export type UpdateProductsPayload = InferType<typeof updateProductsSchema>;
