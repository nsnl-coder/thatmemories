import { useRouter } from 'next/router';

interface Props {
  sortBy: string;
}

function SortItem(props: Props): JSX.Element {
  const { sortBy } = props;
  const router = useRouter();

  const onClickHandler = () => {
    router.push({
      query: {
        ...router.query,
        sort: router.query.sort?.includes('-') ? `-${sortBy}` : sortBy,
      },
    });
  };

  return (
    <li className="cursor-pointer group" onClick={onClickHandler}>
      <div className="flex items-center text-paragraph">
        <input
          id={sortBy}
          type="radio"
          className="radio radio-sm py-2 group-hover:border-gray-400 border-2"
          name="sortBy"
          checked={router.query.sort?.includes(sortBy) ? true : false}
          readOnly
        />
        <label
          className="py-2 px-3 block flex-grow cursor-pointer"
          htmlFor={sortBy}
        >
          {sortBy}
        </label>
      </div>
    </li>
  );
}

export default SortItem;
