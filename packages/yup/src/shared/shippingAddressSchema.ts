import { InferType, object, string } from 'yup';

const shippingAddressSchema = object({
  line1: string().required(),
  line2: string().nullable(),
  city: string(),
  state: string(),
  postal_code: string(),
  country: string().required(),
});

interface IShippingAddress extends InferType<typeof shippingAddressSchema> {
  _id: string;
}

export { shippingAddressSchema };
export type { IShippingAddress };
