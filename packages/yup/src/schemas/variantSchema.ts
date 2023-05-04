import { InferType, array, number, object, string } from 'yup';
import { updateList } from '../shared/updateList';

const optionSchema = object({
  optionName: string().max(255),
  photo: string().max(255),
  price: number(),
  _id: string(),
});

const createVariantSchema = object({
  variantName: string().min(1).max(255).label('Variant name'),
  options: array().of(optionSchema).max(50).label('options').default([]),
});

const updateVariantSchema = createVariantSchema;
const updateVariantsSchema = updateVariantSchema.concat(updateList);

interface IOption extends Omit<InferType<typeof optionSchema>, '_id'> {
  _id: string;
}

interface IVariant
  extends Omit<InferType<typeof createVariantSchema>, 'options'> {
  _id: string;
  options: IOption[];
}

export { createVariantSchema, updateVariantSchema, updateVariantsSchema };
export type { IVariant, IOption };

export type CreateVariantPayload = InferType<typeof createVariantSchema>;
export type UpdateVariantPayload = InferType<typeof updateVariantSchema>;
export type updateVariantsPayload = InferType<typeof updateVariantsSchema>;
