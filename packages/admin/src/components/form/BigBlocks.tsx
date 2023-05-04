import { Children } from '@src/types/shared';

function BigBlock(props: Children): JSX.Element {
  return (
    <div className="w-full gap-y-5 flex flex-col flex-grow">
      {props.children}
    </div>
  );
}

export default BigBlock;
