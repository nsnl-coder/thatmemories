import { AiFillDelete } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';

interface Props {
  menu: {
    name: string;
    index: number;
  };
}

function ChildMenuMock(props: Props): JSX.Element {
  const { menu } = props;

  return (
    <div className="shadow-2xl border">
      <div className="h-12 flex items-center gap-x-4 justify-between bg-slate-50 px-6">
        <div className="flex gap-x-6">
          <span className="w-6 flex text-sm items-center justify-center aspect-square rounded-full">
            {menu.index + 1}
          </span>
          <span>{menu.name}</span>
        </div>
        <div className="flex items-center gap-x-4">
          <AiFillDelete
            size={22}
            className="hover:text-red-400 cursor-pointer"
          />
          <TbGridDots size={22} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default ChildMenuMock;
