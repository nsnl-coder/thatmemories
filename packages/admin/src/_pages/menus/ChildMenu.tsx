import { AiFillDelete } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';

import { DRAG_TYPES } from '@src/types/enum';
import { IMenu } from '@src/yup/menuSchema';

import SwapWrapper from '@components/swapWrapper/SwapWrapper';

interface Props {
  menu: IMenu;
  index: number;
  removeMenu: (removeId: string) => void;
  swapPosition: (id1: string | number, id2: string | number) => void;
}

function ChildMenu(props: Props): JSX.Element | null {
  const { menu, swapPosition, index, removeMenu } = props;

  if (!menu._id) return null;

  return (
    <SwapWrapper
      itemType={DRAG_TYPES.MENU}
      index={index}
      id={menu._id}
      swapBy="id"
      swapById={swapPosition}
      swapOn="hover"
      payload={{ name: menu.name, index, id: menu._id }}
    >
      <div className="h-12 flex items-center gap-x-4 justify-between bg-slate-50 px-6 cursor-pointer">
        <div className="flex gap-x-6">
          <span className="w-6 flex text-sm items-center justify-center aspect-square rounded-full">
            {index + 1}
          </span>
          <span>{menu.name}</span>
        </div>
        <div className="flex items-center gap-x-4">
          <AiFillDelete
            size={22}
            className="hover:text-red-400 cursor-pointer"
            onClick={() => menu._id && removeMenu(menu._id)}
          />
          <TbGridDots size={22} className="cursor-pointer" />
        </div>
      </div>
    </SwapWrapper>
  );
}

export default ChildMenu;
