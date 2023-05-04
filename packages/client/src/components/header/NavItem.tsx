import Link from 'next/link';

function NavItem(): JSX.Element {
  return (
    <li className="px-4 cursor-pointer py-2.5">
      <Link href="/">Women</Link>
    </li>
  );
}

export default NavItem;
