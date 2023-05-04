import { useRouter } from 'next/router';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { BiSortAlt2 } from 'react-icons/bi';
//
import SortItem from './SortItem';
import { Sort } from './Toolbar';

interface Props {
  sort: Sort;
}

function SortBar(props: Props): JSX.Element {
  const { sort } = props;
  const router = useRouter();

  const sortAscHandler = () => {
    if (
      typeof router.query.sort === 'string' &&
      router.query.sort.includes('-')
    ) {
      router.push({
        query: {
          ...router.query,
          sort: router.query.sort.replace('-', ''),
        },
      });
    }
  };

  const sortDescHandler = () => {
    if (
      typeof router.query.sort === 'string' &&
      !router.query.sort.includes('-')
    ) {
      router.push({
        query: {
          ...router.query,
          sort: `-${router.query.sort}`,
        },
      });
    }
  };

  const sortDirection = router.query.sort?.includes('-') ? 'desc' : 'asc';
  const currentSort = sort.find((item) => router.query.sort?.includes(item[0]));

  const clearFilter = () => {
    const query = router.query;
    delete query.sort;

    router.push({
      query,
    });
  };

  return (
    <div className={`dropdown dropdown-end text-paragraph`}>
      <label
        tabIndex={0}
        className="border p-1 block cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-sm"
      >
        <BiSortAlt2 size={23} />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content bg-base-100 w-52 shadow divide-y mt-1 dropdown-open"
      >
        <div className="py-3 px-3">
          <h3 className="font-semibold">Sort by</h3>
          <ul>
            {sort.map((item) => (
              <SortItem key={item[0]} sortBy={item[0]} />
            ))}
          </ul>
          <div className="flex justify-center">
            <button
              type="button"
              className="mt-2 text-sm text-blue-600 hover:underline"
              onClick={() => clearFilter()}
            >
              Clear filter
            </button>
          </div>
        </div>
        <ul className="px-3 py-4 space-y-2 cursor-pointer">
          <li
            onClick={sortAscHandler}
            className={`flex gap-x-2 items-center px-1 py-1 rounded-sm ${
              sortDirection === 'asc' ? 'bg-blue-50' : ''
            }`}
          >
            <AiOutlineArrowUp size={21} />
            <span>{currentSort ? currentSort[1] : 'a-z'}</span>
          </li>
          <li
            onClick={sortDescHandler}
            className={`flex gap-x-2 items-center px-1 py-1 ${
              sortDirection == 'desc' ? 'bg-blue-50' : ''
            }`}
          >
            <AiOutlineArrowDown size={21} />
            <span>{currentSort ? currentSort[2] : 'z-a'}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SortBar;
