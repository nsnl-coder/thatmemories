import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { BiSort } from 'react-icons/bi';
import { BsSortAlphaDown, BsSortAlphaUpAlt } from 'react-icons/bs';

interface Props {
  fieldName: string;
  sortBy?: string;
}

function Thead(props: Props): JSX.Element {
  const router = useRouter();

  const { fieldName, sortBy } = props;
  const [sortDirection, setSortDirection] = useState<null | 'asc' | 'desc'>(
    null,
  );

  const handleSortDirectionChange = (sortDirection: string | null) => {
    if (!sortBy) return;

    let sort = router.query.sort || '';

    if (typeof sort !== 'string') return;

    const sortArr = sort.split(',');
    const newSortArr = sortArr.filter(
      (q) => q !== sortBy && q !== `-${sortBy}`,
    );

    if (sortDirection === 'asc') {
      newSortArr.push(sortBy);
    }
    if (sortDirection === 'desc') {
      newSortArr.push(`-${sortBy}`);
    }

    sort = newSortArr.join(',');

    if (sort.length > 0) {
      router.push({
        query: {
          ...router.query,
          sort,
        },
      });
    } else {
    }
  };

  const handleOnClick = () => {
    setSortDirection((prev) => {
      const newSortDirection =
        prev === null ? 'asc' : prev === 'asc' ? 'desc' : null;
      handleSortDirectionChange(newSortDirection);
      return newSortDirection;
    });
  };

  return (
    <th className="group" onClick={handleOnClick}>
      <div className="flex items-center gap-x-3 cursor-pointer">
        {fieldName}
        {sortBy && (
          <span
            className={`${
              sortDirection ? '' : 'opacity-0'
            } group-hover:opacity-100 w-5`}
          >
            {sortDirection === 'asc' && <BsSortAlphaDown size={18} />}
            {sortDirection === 'desc' && <BsSortAlphaUpAlt size={18} />}
            {sortDirection === null && <BiSort className="opacity-50" />}
          </span>
        )}
      </div>
    </th>
  );
}

export default Thead;
