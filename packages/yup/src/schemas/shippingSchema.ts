import { InferType, number, object, string } from 'yup';
import { updateList } from '../shared/updateList';

const createShippingSchema = object({
  display_name: string().max(255).label('name'),
  fees: number().min(0).max(9999).label('Delivery fees'),
  status: string().oneOf(['draft', 'active']).label('status'),
  delivery_min: number().min(0).max(9999).label('Delivery min duration'),
  delivery_max: number()
    .when('delivery_min', ([delivery_min], schema) =>
      schema.min(
        delivery_min,
        'Delivery max should be greater than delivery min.',
      ),
    )
    .label('Delivery max'),
  freeshipOrderOver: number()
    .min(0)
    .max(9999999)
    .label('Freeship for order over'),
  delivery_estimation: string(),
});

const updateShippingSchema = createShippingSchema;
const updateShippingsSchema = updateShippingSchema.concat(updateList);

interface IShipping extends InferType<typeof createShippingSchema> {
  _id: string;
}

export { createShippingSchema, updateShippingSchema, updateShippingsSchema };
export type { IShipping };

export type CreateShippingPayload = InferType<typeof createShippingSchema>;
export type UpdateShippingPayload = InferType<typeof updateShippingSchema>;
export type UpdateShippingsPayload = InferType<typeof updateShippingsSchema>;
