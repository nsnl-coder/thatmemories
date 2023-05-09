import type { Schema } from 'mongoose';
import { InferType, number, object, string } from 'yup';
import { updateList } from '../shared/updateList';

const createShippingSchema = object({
  display_name: string().max(255).label('name'),
  fees: number()
    .min(0)
    .max(9999)
    .label('Delivery fees')
    .typeError('Delivery fees must be a number')
    .required(),
  status: string().oneOf(['draft', 'active']).label('status'),
  delivery_min: number()
    .min(0)
    .max(9999)
    .label('Delivery min duration')
    .typeError('Delivery minimum duration must be a number'),
  delivery_max: number()
    .when('delivery_min', ([delivery_min], schema) =>
      schema.min(
        delivery_min,
        'Delivery max should be greater than delivery min.',
      ),
    )
    .typeError('Delivery max duration must be a number')
    .label('Delivery max'),
  freeshipOrderOver: number()
    .min(0)
    .max(9999999)
    .label('Freeship for order over')
    .typeError('Freeship order minimum must be a number'),
  delivery_estimation: string(),
});

const updateShippingSchema = createShippingSchema;
const updateShippingsSchema = updateShippingSchema.concat(updateList);

interface IShipping extends InferType<typeof createShippingSchema> {
  _id: Schema.Types.ObjectId;
}

export { createShippingSchema, updateShippingSchema, updateShippingsSchema };
export type { IShipping };

export type CreateShippingPayload = InferType<typeof createShippingSchema>;
export type UpdateShippingPayload = InferType<typeof updateShippingSchema>;
export type UpdateShippingsPayload = InferType<typeof updateShippingsSchema>;
