import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
}

function Gotopage(props: Props): JSX.Element {
  const router = useRouter();
  const { currentPage, totalPages } = props;

  const [page, setPage] = useState<number>(currentPage);
  const [validPage, setValidPage] = useState<boolean>(true);

  const submitHanlder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (page > 0 && page <= totalPages) {
      router.push({
        query: {
          ...router.query,
          page,
        },
      });
      setValidPage(true);
    } else {
      setValidPage(false);
    }
  };

  const onPageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newPage = +e.target.value;
    setValidPage(true);

    if (newPage > totalPages) {
      setPage(totalPages);
      return;
    }

    if (newPage < 0) {
      setPage(1);
      return;
    }

    if (newPage >= 0 && newPage <= totalPages) {
      setPage(newPage);
      return;
    }

    setPage(currentPage);
  };

  return (
    <form onSubmit={submitHanlder}>
      <span>Go to page: </span>
      <input
        type="text"
        className={`w-14 h-7 border-2 rounded-sm text-center outline-none ${
          !validPage ? 'border border-red-400' : ''
        }`}
        min={0}
        max={totalPages}
        value={page}
        onChange={onPageChangeHandler}
      />
    </form>
  );
}

export default Gotopage;
