import { BiChevronRight } from 'react-icons/bi';

import { Children } from '@src/types/shared';

interface Props extends Children {
  textContent: string;
  className?: string;
}

function WithNestedMenu(props: Props): JSX.Element {
  const { children, textContent, className } = props;

  return (
    <li className="relative group px-2">
      <div className="hidden peer group-hover:block absolute top-0 rounded-sm left-full">
        {children}
      </div>
      <div
        className={`flex items-center justify-between peer-hover:bg-primary/25 px-1.5 py-1.5 rounded-sm cursor-pointer hover:bg-primary/25 ${className}`}
      >
        <h1> {textContent} </h1>
        <BiChevronRight />
      </div>
    </li>
  );
}

export default WithNestedMenu;
