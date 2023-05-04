import Link from 'next/link';

import { RequestConfig } from '@react-query/queryConfig';

interface Props {
  requestConfig: RequestConfig;
  _id: string | undefined;
  text: string | number | undefined;
}

function TableLinkColumn(props: Props): JSX.Element | null {
  const { requestConfig, _id, text } = props;

  if (!_id) return null;

  return (
    <td className="max-w-xs font-semibold hover:underline">
      <Link
        href={`/${requestConfig.pluralName}/${_id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>{text}</div>
      </Link>
    </td>
  );
}

export default TableLinkColumn;
