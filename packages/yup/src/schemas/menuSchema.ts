import type { Schema } from 'mongoose';
import { InferType, array, number, object, string } from 'yup';
import { updateList } from '../shared/updateList';

const createMenuSchema = object({
  name: string().max(255).label('name'),
  status: string()
    .oneOf(['draft', 'active'])
    .label('Publish status')
    .default('draft'),
  link: string().max(255).label('link'),
  photo: string().max(255).label('photo'),
  menuType: string().oneOf(['root', 'nested']),
  position: string().oneOf(['header', 'footer', '']),
  ordering: number().min(0).max(9999).label('ordering'),
  childMenus: array()
    .of(string().length(24, 'invalid objectid'))
    .default([])
    .label('Child menus'),
});

const updateMenuSchema = createMenuSchema;
const updateMenusSchema = createMenuSchema.concat(updateList);

interface IMenu extends Omit<InferType<typeof createMenuSchema>, 'childMenus'> {
  _id: Schema.Types.ObjectId;
  childMenus: Schema.Types.ObjectId[] | IMenu[];
}

export { createMenuSchema, updateMenuSchema, updateMenusSchema };
export type { IMenu };

export type CreateMenuPayload = InferType<typeof createMenuSchema>;
export type UpdateMenuPayload = InferType<typeof updateMenuSchema>;
export type UpdateMenusPayload = InferType<typeof updateMenusSchema>;
