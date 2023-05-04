import { InferType, array, object, string } from 'yup';
import { updateList } from '../shared/updateList';

const optionSchema = object({
  optionName: string().max(255),
  photo: string().max(255),
  price: string(),
  _id: string(),
});

const createVariantSchema = object({
  variantName: string().min(1).max(255).label('Variant name'),
  options: array().of(optionSchema).max(50).label('options'),
});

const updateVariantSchema = createVariantSchema;
const updateVariantsSchema = updateVariantSchema.concat(updateList);

interface IVariant extends InferType<typeof createVariantSchema> {
  _id: string;
  name: string;
}

export { createVariantSchema, updateVariantSchema, updateVariantsSchema };
export type { IVariant };

export type CreateVariantPayload = InferType<typeof createVariantSchema>;
export type UpdateVariantPayload = InferType<typeof updateVariantSchema>;
export type updateVariantsPayload = InferType<typeof updateVariantsSchema>;
