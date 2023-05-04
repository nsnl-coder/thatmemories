import { IHome } from '@thatmemories/yup';
import { Schema, model } from 'mongoose';

const homeSchema = new Schema<IHome>(
  {
    versionName: String,
    status: String,
    carouselItems: [
      {
        photo: String,
        title: String,
        description: String,
        link: String,
      },
    ],
    featuredProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'product',
      },
    ],
    featuredCollections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'collection',
      },
    ],
    featuredPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'post',
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  },
);

const Home = model<IHome>('home', homeSchema);

export { homeSchema, Home };
