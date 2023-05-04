import { InferType, array, boolean, object, string } from 'yup';
import { updateList } from '../shared/updateList';
import { IUser } from './authSchema';
import { IPostCategory } from './postCategorySchema';

const createPostSchema = object({
  name: string().required(),
  description: string().max(10000).label('description'),
  isPinned: boolean().label('isPinned'),
  status: string().oneOf(['draft', 'active']).label('status'),
  categories: array().of(string().length(24)),
  createdBy: string().length(24).required(),
});

const updatePostSchema = createPostSchema;
const updatePostsSchema = updatePostSchema.concat(updateList);

interface IPost extends CreatePostPayload {
  _id?: string;
  slug: string;
}

interface IPopulatedPost
  extends Omit<CreatePostPayload, 'categories' | 'createdBy'> {
  categories: IPostCategory[];
  createdBy: IUser;
}

export { createPostSchema, updatePostSchema, updatePostsSchema };
export type { IPost, IPopulatedPost };

export type CreatePostPayload = InferType<typeof createPostSchema>;
export type UpdatePostPayload = InferType<typeof updatePostSchema>;
export type UpdatePostsPayload = InferType<typeof updatePostsSchema>;
