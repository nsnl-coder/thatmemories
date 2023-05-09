import { Children } from '@src/types/shared';
import Link from 'next/link';

interface Props extends Children {
  href?: string;
  title: string;
  description: string;
}

function Card(props: Props): JSX.Element {
  const { children, title, description, href } = props;

  if (!href)
    return (
      <div className="px-4 py-6 border rounded-md flex items-start gap-x-6 bg-base-100 h-full cursor-pointer">
        <div>{children}</div>
        <div>
          <h4 className="font-medium capitalize">{title}</h4>
          <p className="text-sm text-neutral/70">{description}</p>
        </div>
      </div>
    );

  return (
    <Link
      className="px-4 py-6 border rounded-md flex items-start gap-x-6 bg-base-100 h-full"
      href={href}
    >
      <div>{children}</div>
      <div>
        <h4 className="font-medium capitalize">{title}</h4>
        <p className="text-sm text-neutral/70">{description}</p>
      </div>
    </Link>
  );
}

export default Card;
