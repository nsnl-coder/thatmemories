import { IMenu } from '@thatmemories/yup';
import Link from 'next/link';

interface Props {
  menu: IMenu;
}

function NavItem(props: Props): JSX.Element {
  const { menu } = props;

  return (
    <div className="px-4 cursor-pointer py-2.5 capitalize hover:underline hover:text-blue-600">
      <Link href={menu.link || '/'} className="block">
        {menu.name}
      </Link>
    </div>
  );
}

export default NavItem;
