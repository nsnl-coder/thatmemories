import EmptyUi from '../emptyui/EmptyUi';
import Pagination from '../pagination/Pagination';
import TableHeading, { TableHeadingProps } from './TableHeading';

import { Children } from '@src/types/shared';

interface Props extends Children, TableHeadingProps {
  className?: string;
  isLoading: boolean;
}

function TableWrapper(props: Props): JSX.Element {
  const { pagination, requestConfig, isLoading } = props;

  return (
    <div className={`px-12 ${props.className} mx-auto pb-32`}>
      <TableHeading pagination={pagination} requestConfig={requestConfig} />
      <div className="bg-white shadow-lg ">
        {props.children}
        <EmptyUi
          totalPage={pagination?.totalPages}
          isLoading={isLoading}
          requestConfig={requestConfig}
        />
        <Pagination pagination={pagination} />
      </div>
    </div>
  );
}

export default TableWrapper;
