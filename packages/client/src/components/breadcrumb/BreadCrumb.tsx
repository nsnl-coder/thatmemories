import Link from 'next/link';

interface BreadCrumbPath {
  text: string;
  link: string;
}

interface Props {
  paths: BreadCrumbPath[];
}

function BreadCrumb(props: Props): JSX.Element {
  const { paths = [] } = props;

  const withHomePaths: BreadCrumbPath[] = [
    { text: 'home', link: '/' },
    ...paths,
  ];

  const lastPathIndex = withHomePaths.length - 1;

  return (
    <div className="mt-3 mb-6 text-sm flex gap-x-1 max-w-full truncate">
      {withHomePaths.map((path, index) => {
        const isLastPath = index === lastPathIndex;

        return (
          <div className="flex gap-x-1" key={path.link}>
            <Link
              className={`first-letter:capitalize hover:underline truncate  ${
                isLastPath
                  ? 'max-w-xs'
                  : 'max-w-[160px] lg:max-w-[300px] opacity-40 hover:opacity-100 '
              }`}
              href={path.link}
            >
              {path.text}
            </Link>
            {!isLastPath && <span>&#8725;</span>}
          </div>
        );
      })}
    </div>
  );
}

export default BreadCrumb;
