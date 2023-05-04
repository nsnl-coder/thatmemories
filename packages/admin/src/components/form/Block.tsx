import { Children } from '@src/types/shared';

interface Props {
  blockTitle?: string;
  className?: string;
  children?: any;
}

function Block(props: Props): JSX.Element {
  const { blockTitle, className } = props;

  return (
    <div
      className={`w-full rounded-lg py-6 px-6 shadow-lg bg-white flex flex-col gap-y-6 ${className}`}
    >
      {blockTitle && <h2 className="font-medium">{blockTitle}</h2>}
      {props.children}
    </div>
  );
}

export default Block;
