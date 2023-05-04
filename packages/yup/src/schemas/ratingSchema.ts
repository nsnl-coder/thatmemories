import { InferType, number, object, string } from 'yup';
import { updateList } from '../shared/updateList';
import { IUser } from './authSchema';

const createRatingSchema = object({
  product: string().length(24).required().label('Product id').required(),
  stars: number()
    .oneOf([1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5])
    .label('Number of stars')
    .required(),
  content: string().max(255).label('Rating content').required(),
});

const updateRatingSchema = createRatingSchema;
const updateRatingsSchema = createRatingSchema.concat(updateList);

interface IRating
  extends Omit<InferType<typeof createRatingSchema>, 'createdBy'> {
  createdBy: IUser | string;
}

export { createRatingSchema, updateRatingSchema, updateRatingsSchema };
export type { IRating };
export type CreateRatingPayload = InferType<typeof createRatingSchema>;
export type UpdateRatingPayload = InferType<typeof updateRatingSchema>;
export type UpdateRatingsPayload = InferType<typeof updateRatingsSchema>;
