import { InferType, boolean, object, string } from 'yup';
import { updateList } from '../shared/updateList';

const createContactSchema = object({
  email: string().email().label('email').required(),
  fullname: string().max(255).label('fullname').required(),
  phone: string()
    .matches(/^[0-9]{9,16}$/, 'Please provide valid phone number')
    .label('phone')
    .required(),
  subject: string().max(100).label('subject').required(),
  content: string().max(255).label('content').required(),
});

const updateContactSchema = createContactSchema.shape({
  isRead: boolean().label('isRead'),
  adminNotes: string().max(255).label('Note'),
});

const updateContactsSchema = updateContactSchema.concat(updateList);

type CreateContactPayload = InferType<typeof createContactSchema>;
type UpdateContactPayload = InferType<typeof updateContactSchema>;
type UpdateContactsPayload = InferType<typeof updateContactsSchema>;

interface IContact extends UpdateContactPayload {
  _id: string;
}

export { createContactSchema, updateContactSchema, updateContactsSchema };
export type {
  CreateContactPayload,
  UpdateContactPayload,
  UpdateContactsPayload,
  IContact,
};
