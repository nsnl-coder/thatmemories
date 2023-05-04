import { Children } from '@src/types/shared';

function SmallBlock(props: Children): JSX.Element {
  return (
    <div className="max-w-xs w-full flex flex-col gap-y-5">
      {props.children}
    </div>
  );
}

export default SmallBlock;
