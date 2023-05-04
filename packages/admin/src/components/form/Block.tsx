interface Props {
  blockTitle?: string;
  className?: string;
  children?: any;
}

function Block(props: Props): JSX.Element {
  const { blockTitle, className } = props;

  return (
    <div className={`w-full rounded-lg py-6 px-6 shadow-lg bg-white  `}>
      {blockTitle && <h2 className="font-medium mb-8">{blockTitle}</h2>}
      <div className={'flex flex-col gap-y-6'}>{props.children}</div>
    </div>
  );
}

export default Block;
