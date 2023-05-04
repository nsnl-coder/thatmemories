import { InferType, array, object, string } from 'yup';
import { updateList } from '../shared/updateList';
import { ICollection } from './collectionSchema';
import { IPost } from './postSchema';
import { IProduct } from './productSchema';

const carouselItem = object({
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
    .label('Featured products'),
  featuredCollections: array()
    .of(string().length(24, 'Invalid object id'))
    .label('Featured collections'),
  featuredPosts: array()
    .of(string().length(24, 'Invalid object id'))
    .label('Featured posts'),
});

const updateHomeSchema = createHomeSchema;
const updateHomesSchema = updateHomeSchema.concat(updateList);

interface ICarouselItem extends InferType<typeof carouselItem> {
  _id: string;
}

interface IHome extends Omit<CreateHomePayload, 'carouselItems'> {
  _id: string;
  carouselItems: ICarouselItem[];
}

interface IPopulatedHome
  extends Omit<
    CreateHomePayload,
    | 'featuredProducts'
    | 'featuredCollections'
    | 'featuredPosts'
    | 'carouselItems'
  > {
  featuredProducts: IProduct[];
  featuredCollections: ICollection[];
  featuredPosts: IPost[];
  carouselItems: ICarouselItem[];
}

export type CreateHomePayload = InferType<typeof createHomeSchema>;
export type UpdateHomePayload = CreateHomePayload;
export type UpdateHomesPayload = CreateHomePayload;

export type { IHome, IPopulatedHome, ICarouselItem };
export { createHomeSchema, updateHomeSchema, updateHomesSchema };
