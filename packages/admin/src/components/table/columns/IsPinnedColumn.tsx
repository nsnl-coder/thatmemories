import { useEffect, useState } from 'react';
import { AiFillPushpin } from 'react-icons/ai';

import useUpdateOne from '@react-query/query/useUpdateOne';
import { RequestConfig } from '@react-query/queryConfig';

interface Props {
  isPinned: boolean | undefined;
  requestConfig: RequestConfig;
  id: string | undefined;
}

function IsPinnedColumn(props: Props): JSX.Element {
  let { requestConfig, id } = props;
  const [isPinned, setIsPinned] = useState<boolean | undefined>(props.isPinned);
  const { updateOne } = useUpdateOne(requestConfig);

  const toggleIsPinned = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    updateOne({ isPinned: !isPinned }, id);
    setIsPinned(!isPinned);
  };

  useEffect(() => {
    if (props.isPinned !== undefined) {
      setIsPinned(props.isPinned);
    }
  }, [props.isPinned]);

  return (
    <td>
      {isPinned && (
        <button
          type="button"
          onClick={toggleIsPinned}
          className="tooltip hover:text-red-400"
          data-tip="unpin"
        >
          <AiFillPushpin size={24} />
        </button>
      )}
    </td>
  );
}

export default IsPinnedColumn;
