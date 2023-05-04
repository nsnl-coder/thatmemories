import { BiArrowBack } from 'react-icons/bi';
import { IoMdTrash } from 'react-icons/io';

import useDeleteOne from '@react-query/query/useDeleteOne';
import { RequestConfig } from '@react-query/queryConfig';
import { useRouter } from 'next/router';

interface Props {
  title: string | number;
  requestConfig: RequestConfig;
  id: string | undefined;
  status: 'active' | 'draft' | undefined;
}

function UpdatePageHeading(props: Props): JSX.Element {
  const router = useRouter();
  const { title, requestConfig, id, status } = props;
  const { deleteOne } = useDeleteOne(requestConfig);

  const handleDeleteOne = () => {
    deleteOne(id);
  };

  const redirectBack = () => router.back();

  return (
    <div className="flex gap-x-5 my-4">
      <div className="flex-grow flex items-center gap-x-4">
        <button
          type="button"
          onClick={() => redirectBack()}
          className="border p-2 hover:text-zinc-700 rounded-md"
        >
          <BiArrowBack size={28} />
        </button>
        <h1 className="text-xl font-semibold flex-grow ">{title}</h1>
        {status && (
          <span
            className={
              status === 'active' ? 'badge-success badge text-white' : 'badge'
            }
          >
            {status}
          </span>
        )}
      </div>
      <div className="max-w-xs w-full flex items-center justify-end">
        <button
          type="button"
          className="tooltip tooltip-bottom hover:text-red-400 ml-2"
          data-tip="delete"
          onClick={handleDeleteOne}
        >
          <IoMdTrash size={31} />
        </button>
      </div>
    </div>
  );
}

export default UpdatePageHeading;
