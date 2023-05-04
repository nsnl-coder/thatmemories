import Link from 'next/link';
import { AiFillEdit } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';

import useDeleteOne from '@react-query/query/useDeleteOne';
import { RequestConfig } from '@react-query/queryConfig';

interface Props {
  requestConfig: RequestConfig;
  id: string | undefined;
}

function ActionsColumn(props: Props): JSX.Element {
  const { requestConfig, id } = props;
  const { deleteOne } = useDeleteOne(requestConfig);

  const handleDeleteOne = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    deleteOne(id);
  };

  return (
    <td>
      <div className="flex gap-x-6 items-center">
        <Link
          href={`${requestConfig.pluralName}/${id}`}
          className="tooltip tooltip-top hover:text-orange-500"
          data-tip="edit"
          onClick={(e) => e.stopPropagation()}
        >
          <AiFillEdit size={22} />
        </Link>
        <button
          type="button"
          className="tooltip tooltip-top hover:text-red-400"
          data-tip="delete"
          onClick={handleDeleteOne}
        >
          <IoMdTrash size={24} />
        </button>
      </div>
    </td>
  );
}

export default ActionsColumn;
