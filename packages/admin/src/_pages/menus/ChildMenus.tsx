import { useController } from 'react-hook-form';
import ChildMenu from './ChildMenu';

import getRandomString from '@src/utils/getRandomString';
import { IMenu } from '@src/yup/menuSchema';

interface Props {
  control: any;
  menus: IMenu[] | undefined;
}

function ChildMenus(props: Props): JSX.Element {
  const { control, menus = [] } = props;

  const { field } = useController({
    control,
    name: 'childMenus',
    defaultValue: [],
  });

  const swapPosition = (id1: string | number, id2: string | number) => {
    const ids = field.value;
    const index1 = ids.findIndex((id: string) => id === id1);
    const index2 = ids.findIndex((id: string) => id === id2);

    if (index1 === -1 || index2 === -1) return;

    [ids[index1], ids[index2]] = [ids[index2], ids[index1]];
    field.onChange(ids);
  };

  const removeMenu = (removeId: string) => {
    const ids = field.value;

    if (!Array.isArray(ids)) return;

    const index = ids.findIndex((id: string) => id === removeId);
    ids.splice(index, 1);

    field.onChange(ids);
  };

  const selectedIds: string[] = field.value || [];
  const selectedMenus: IMenu[] = selectedIds.map(
    (id) =>
      menus.find((menu) => menu._id === id) ||
      ({ name: 'Not found', _id: getRandomString(24) } as IMenu),
  );

  return (
    <div className="space-y-1">
      {selectedMenus.map((menu, index) => (
        <ChildMenu
          key={menu._id}
          menu={menu}
          swapPosition={swapPosition}
          index={index}
          removeMenu={removeMenu}
        />
      ))}
    </div>
  );
}

export default ChildMenus;
