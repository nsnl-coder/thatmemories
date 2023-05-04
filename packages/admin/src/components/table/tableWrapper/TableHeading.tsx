import Link from 'next/link';

import { Pagination } from '@src/types/http';

import { RequestConfig } from '@react-query/queryConfig';

export interface TableHeadingProps {
  pagination: Pagination | undefined;
  requestConfig: RequestConfig;
}

function TableHeading(props: TableHeadingProps): JSX.Element {
  const { pagination, requestConfig } = props;

  const results = pagination?.results || 0;
  const currentPage = pagination?.currentPage || 0;
  const itemsPerPage = pagination?.itemsPerPage || 0;
  const totalResults = pagination?.totalResults || 0;

  const from = (currentPage - 1) * itemsPerPage + 1;
  const to = from + results - 1;

  let text = '';
  if (from > 0 && to > 0) {
    text = `: ${from}-${to} of ${totalResults}`;
  }

  return (
    <div className="flex justify-between py-6 items-center">
      <h2 className="font-semibold text-xl">
        <span className="capitalize">{requestConfig.pluralName}</span> {text}
      </h2>
      <Link
        href={`/${requestConfig.pluralName}/create`}
        type="button"
        className="bg-primary text-white px-2 py-2"
      >
        Add {requestConfig.singularName}
      </Link>
    </div>
  );
}

export default TableHeading;
