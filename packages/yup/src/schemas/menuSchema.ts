import { InferType, array, number, object, string } from 'yup';
import { updateList } from '../shared/updateList';

const createMenuSchema = object({
  name: string().max(255).label('name'),
  status: string()
    .oneOf(['draft', 'active'])
    .default('draft')
    .label('Publish status'),
  link: string().max(255).label('link'),
  photo: string().max(255).label('photo'),
  menuType: string().oneOf(['root', 'nested']),
  position: string().oneOf(['header', 'footer', '']),
  ordering: number().min(0).max(9999).label('ordering'),
  childMenus: array()
    .of(string().length(24, 'invalid objectid'))
    .label('Child menus'),
});

const updateMenuSchema = createMenuSchema;
const updateMenusSchema = createMenuSchema.concat(updateList);

interface IMenu extends CreateMenuPayload {
  _id: string;
}

interface IPopulatedMenu extends Omit<IMenu, 'childMenus'> {
  childMenus: IMenu;
}

export { createMenuSchema, updateMenuSchema, updateMenusSchema };
export type { IMenu, IPopulatedMenu };

export type CreateMenuPayload = InferType<typeof createMenuSchema>;
export type UpdateMenuPayload = InferType<typeof updateMenuSchema>;
export type UpdateMenusPayload = InferType<typeof updateMenusSchema>;
