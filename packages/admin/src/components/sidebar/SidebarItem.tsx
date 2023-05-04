import Link from 'next/link';

interface Props {
  text: string;
  href: string;
  icon: JSX.Element;
}

function SidebarItem(props: Props): JSX.Element {
  const { text, href = '/', icon } = props;

  return (
    <Link
      href={href}
      className="py-2 hover:bg-gray-100 px-4 rounded-md capitalize flex items-center gap-x-3"
    >
      {icon}
      <span> {text} </span>
    </Link>
  );
}

export default SidebarItem;
