import Skeleton from 'react-loading-skeleton';

interface Props {
  count?: number;
  className?: string;
}

function GridSkeleton(props: Props): JSX.Element {
  const { count, className } = props;

  return (
    <>
      {Array(count)
        .fill(0)
        .map((item, i) => (
          <div key={i} className={`relative ${className} overflow-hidden`}>
            <Skeleton className={'h-full w-full absolute top-0 left-0 m-0'} />
          </div>
        ))}
    </>
  );
}

export default GridSkeleton;
