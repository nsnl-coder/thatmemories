import Link from 'next/link';

import FilePreview from '@components/filePreview/FilePreview';
import { RequestConfig } from '@react-query/queryConfig';

interface Props {
  id: string | undefined;
  s3Key: string | undefined;
  requestConfig: RequestConfig;
}

function PhotoColumn(props: Props): JSX.Element | null {
  const { id, s3Key, requestConfig } = props;

  if (!s3Key || !id) return <td></td>;

  const href = `${requestConfig.pluralName}/${id}`;

  return (
    <td>
      <Link href={href} onClick={(e) => e.stopPropagation()}>
        <div className="w-12 rounded-md overflow-hidden border ">
          <FilePreview src={s3Key} />
        </div>
      </Link>
    </td>
  );
}

export default PhotoColumn;
