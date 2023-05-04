import MultipleSelect from '../customFilter/MultipleSelect';
import SingleSelect from '../customFilter/SingleSelect';
import SearchBar from './SearchBar';
import SortBar from './SortBar';

import { Children } from '@src/types/shared';

export type Sort = string[][];

interface DisplayTool {
  showSearch: boolean;
  showSort: boolean;
  currentFilter: string | undefined;
}

interface Props extends Children {
  sortOptions?: string[][];
  searchBy?: string;
  showStatusFilter?: boolean;
}

function Toolbar(props: Props): JSX.Element {
  const {
    sortOptions = [['name', 'a-z', 'z-a']],
    searchBy = 'name',
    showStatusFilter = true,
    children,
  } = props;

  const sort: Sort = [
    ...sortOptions,
    ['created', 'Oldest first', 'Newest first'],
    ['updated', 'Oldest first', 'Newest first'],
  ];

  return (
    <div className="py-3 px-4 border-b flex items-center justify-between gap-12">
      <div className="flex items-center gap-x-3">
        {showStatusFilter && (
          <MultipleSelect
            queryField="status"
            fieldValues={['draft', 'active']}
          />
        )}
        <SingleSelect
          displayText={'rows per page'}
          queryField="itemsPerPage"
          fieldValues={['5', '10', '20', '50', '100', '200', '500', '1000']}
        />
        {children}
      </div>
      <div className="flex items-center gap-x-4 flex-grow justify-end">
        <SearchBar searchBy={searchBy} />
        <SortBar sort={sort} />
      </div>
    </div>
  );
}

export default Toolbar;
export type { DisplayTool };
