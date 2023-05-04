import { ICollection } from '@thatmemories/yup';
import { Schema, model } from 'mongoose';
import slugify from 'slugify';

const collectionSchema = new Schema<ICollection>(
  {
    hidden_name: String,
    display_name: String,
    photo: String,
    isPinned: Boolean,
    description: String,
    status: {
      type: String,
      enum: ['draft', 'active'],
      default: 'draft',
    },
    slug: String,
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.__v;
        delete ret.id;
      },
    },
    timestamps: true,
  },
);

collectionSchema.pre('save', function (next) {
  if (this.display_name) {
    this.slug = slugify(this.display_name, { lower: true });
  }

  next();
});

collectionSchema.pre(/(updateMany|findOneAndUpdate)/, function (next) {
  //@ts-ignore
  const payload = this.getUpdate() as ICollection;

  if (payload && payload.display_name) {
    payload.slug = slugify(payload.display_name, { lower: true });
  }

  next();
});

collectionSchema.virtual('name').get(function () {
  if (!this.display_name && !this.hidden_name) return undefined;
  if (this.display_name && !this.hidden_name) return this.display_name;
  if (this.display_name && this.hidden_name)
    return `${this.display_name} ( ${this.hidden_name} )`;

  return 'undefined';
});

const Collection = model<ICollection>('collection', collectionSchema);

export { collectionSchema, Collection };
