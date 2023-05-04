import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  href: string;
  activeClassName: string;
  className?: string;
  children: JSX.Element | JSX.Element[] | string;
}

function NavLink(props: Props): JSX.Element {
  const { pathname } = useRouter();

  return (
    <Link
      href={props.href}
      className={`${props.className} ${
        props.href === pathname ? props.activeClassName : ''
      }`}
    >
      {props.children}
    </Link>
  );
}

export default NavLink;
