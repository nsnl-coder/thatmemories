import { IUser } from '@thatmemories/yup';
import { Document } from 'mongoose';
import { HttpError, HttpResponse } from './http';

interface ReqQuery {
  fields: string;
  sort: string;
  page: number;
  itemsPerPage: number;
  skip: number;
  // file query
  limit: number;
  startAfter: string;
  prefix: string;
  key: string;
  filter: {
    [key: string]: any;
  };
}

declare module 'express' {
  interface Request {
    query: ReqQuery;
    user?: Document<unknown, {}, IUser> &
      Omit<
        IUser &
          Required<{
            _id: string;
          }>,
        never
      >;
  }
  interface Response {
    json: (payload: HttpResponse | HttpError) => void;
  }
}

export type { ReqQuery };
