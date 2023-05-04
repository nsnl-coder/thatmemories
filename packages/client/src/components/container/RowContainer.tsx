import { Children } from '@src/types/shared';

interface Props extends Children {
  className?: string;
}

function RowContainer(props: Props): JSX.Element {
  const { className: wrapperClassName } = props;

  return (
    <div className={wrapperClassName}>
      <section className={`max-w-7xl px-3 mx-auto`}>{props.children}</section>
    </div>
  );
}

export default RowContainer;
