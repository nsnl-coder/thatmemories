import { InferType, boolean, object, string } from 'yup';
import { updateList } from '../shared/updateList';

const createPostCategorySchema = object({
  name: string().max(255).label('name'),
  overview: string().max(500).label('overview'),
  photo: string().max(255).label('photo'),
  isPinned: boolean().label('Is pinned'),
  status: string().oneOf(['draft', 'active']).label('status'),
});

const updatePostCategorySchema = createPostCategorySchema;
const updatePostCategoriesSchema = createPostCategorySchema.concat(updateList);

interface CreatePostCategoryPayload
  extends InferType<typeof createPostCategorySchema> {}

interface UpdatePostCategoryPayload
  extends InferType<typeof updatePostCategorySchema> {}

interface UpdatePostCategoriesPayload
  extends InferType<typeof updatePostCategoriesSchema> {}

interface IPostCategory extends CreatePostCategoryPayload {
  _id?: string;
  slug: string;
}

export {
  createPostCategorySchema,
  updatePostCategorySchema,
  updatePostCategoriesSchema,
};
export type {
  IPostCategory,
  CreatePostCategoryPayload,
  UpdatePostCategoryPayload,
  UpdatePostCategoriesPayload,
};
