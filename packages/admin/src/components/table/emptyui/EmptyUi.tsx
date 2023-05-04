import Link from 'next/link';
import { MdLibraryAdd } from 'react-icons/md';

import { RequestConfig } from '@react-query/queryConfig';

interface Props {
  isLoading: boolean;
  totalPage: number | undefined;
  requestConfig: RequestConfig;
}

function EmptyUi(props: Props): JSX.Element | null {
  const { isLoading, totalPage, requestConfig } = props;

  if (isLoading || totalPage) return null;

  return (
    <div className="h-96 flex justify-center items-center flex-col gap-6">
      <MdLibraryAdd size={160} className="text-gray-600/60" />
      <div className="text-lg flex gap-x-3">
        <span>Can not find any {requestConfig.pluralName}.</span>
        <Link
          href={`/${requestConfig.pluralName}/create`}
          className="text-blue-600 hover:underline"
        >
          Click here to add new one.
        </Link>
      </div>
    </div>
  );
}

export default EmptyUi;
