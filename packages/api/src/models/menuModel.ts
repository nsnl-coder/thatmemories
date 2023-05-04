import { IMenu } from '@thatmemories/yup';
import { model, Schema } from 'mongoose';

interface IMenuWithObjectId extends Omit<IMenu, 'childMenus'> {
  childMenus: Schema.Types.ObjectId[];
}

const menuSchema = new Schema<IMenuWithObjectId>(
  {
    name: {
      type: String,
      default: 'unnamed menu',
    },
    status: {
      type: String,
      enum: ['draft', 'active'],
    },
    link: String,
    photo: String,
    ordering: Number,
    menuType: {
      type: String,
      enum: ['root', 'nested'],
      default: 'nested',
    },
    position: {
      type: String,
      enum: ['header', 'footer', ''],
    },
    childMenus: {
      type: [Schema.Types.ObjectId],
      ref: 'menu',
    },
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

const Menu = model<IMenuWithObjectId>('menu', menuSchema);

export { menuSchema, Menu };
