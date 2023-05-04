import { InferType, boolean, object, string } from 'yup';
import { updateList } from '../shared/updateList';

const createCollectionSchema = object({
  display_name: string().max(255).label('Display name'),
  hidden_name: string().max(255).label('Hidden name'),
  description: string().max(2000).label('description'),
  photo: string().max(255).label('photo'),
  isPinned: boolean().label('isPinned'),
  status: string().oneOf(['draft', 'active']).label('status'),
});

const updateCollectionSchema = createCollectionSchema;
const updateCollectionsSchema = createCollectionSchema.concat(updateList);

export interface ICollection extends CreateCollectionPayload {
  _id: string;
  slug: string;
  name?: string;
}

export type CreateCollectionPayload = InferType<typeof createCollectionSchema>;
export type UpdateCollectionPayload = InferType<typeof updateCollectionSchema>;
export type UpdateCollectionsPayload = InferType<
  typeof updateCollectionsSchema
>;
export {
  createCollectionSchema,
  updateCollectionSchema,
  updateCollectionsSchema,
};
