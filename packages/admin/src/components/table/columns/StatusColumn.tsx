import { useEffect, useState } from 'react';

import useUpdateOne from '@react-query/query/useUpdateOne';
import { RequestConfig } from '@react-query/queryConfig';

interface Props {
  status: 'draft' | 'active' | undefined;
  requestConfig: RequestConfig;
  id: string | undefined;
  className?: string;
}

function StatusColumn(props: Props): JSX.Element {
  let { requestConfig, id, className } = props;
  const [status, setStatus] = useState<string>();

  const isActive = status === 'active';
  const isDraft = status === 'draft';

  const { updateOne } = useUpdateOne(requestConfig);

  const toggleStatus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const newStatus = status === 'active' ? 'draft' : 'active';
    updateOne({ status: newStatus }, id);
    setStatus(newStatus);
  };

  useEffect(() => {
    if (props.status) setStatus(props.status);
  }, [props.status]);

  return (
    <td>
      <div data-tip="toggle status" className={`tooltip ${className}`}>
        <button
          className={`badge text-white border-none ${
            isActive ? 'bg-green-600' : isDraft ? '' : 'bg-transparent'
          }`}
          onClick={toggleStatus}
          type="button"
        >
          {isActive ? 'active' : isDraft ? 'draft' : 'unknown'}
        </button>
      </div>
    </td>
  );
}

export default StatusColumn;
