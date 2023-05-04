import type { Schema } from 'mongoose';
import { InferType, array, object, string } from 'yup';
import { updateList } from '../shared/updateList';
import { ICollection } from './collectionSchema';
import { IPost } from './postSchema';
import { IProduct } from './productSchema';

const carouselItem = object({
  _id: string().transform((v) => undefined),
  photo: string().max(255).label('photo'),
  title: string().max(255).label('Carousel title'),
  description: string().max(500).label('Carousel description'),
  link: string().max(255).default('Carousel link'),
}).label('Carousel Item');

const createHomeSchema = object({
  versionName: string().label('version name'),
  status: string().oneOf(['active', 'draft']).label('status').default('draft'),
  carouselItems: array().of(carouselItem).label('Carousel items'),
  featuredProducts: array()
    .of(string().length(24, 'Invalid object id'))
    .default([])
    .label('Featured products'),
  featuredCollections: array()
    .of(string().length(24, 'Invalid object id'))
    .default([])
    .label('Featured collections'),
  featuredPosts: array()
    .of(string().length(24, 'Invalid object id'))
    .default([])
    .label('Featured posts'),
});

const updateHomeSchema = createHomeSchema;
const updateHomesSchema = updateHomeSchema.concat(updateList);

interface ICarouselItem extends InferType<typeof carouselItem> {}
interface IHome
  extends Omit<
    CreateHomePayload,
    'featuredProducts' | 'featuredCollections' | 'featuredPosts'
  > {
  _id: Schema.Types.ObjectId;
  featuredProducts: IProduct[] | Schema.Types.ObjectId[];
  featuredCollections: ICollection[] | Schema.Types.ObjectId[];
  featuredPosts: IPost[] | Schema.Types.ObjectId[];
}

export type { IHome, ICarouselItem };
export { createHomeSchema, updateHomeSchema, updateHomesSchema };

export type CreateHomePayload = InferType<typeof createHomeSchema>;
export type UpdateHomePayload = InferType<typeof updateHomeSchema>;
