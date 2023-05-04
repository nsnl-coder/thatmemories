import { IContact } from '@thatmemories/yup';
import { Schema, model } from 'mongoose';

const contactSchema = new Schema<IContact>(
  {
    email: String,
    fullname: String,
    phone: String,
    subject: String,
    content: String,
    isRead: Boolean,
    adminNotes: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const Contact = model<IContact>('contact', contactSchema);

export { contactSchema, Contact };
