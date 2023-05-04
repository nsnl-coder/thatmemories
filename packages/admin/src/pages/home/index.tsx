import useBulkActions from '@src/hooks/useBulkActions';

import useGetOnes from '@react-query/query/useGetOnes';
import queryConfig from '@react-query/queryConfig';

import BulkActions from '@components/table/bulkActions/BulkActions';
import ActionsColumn from '@components/table/columns/ActionsColumn';
import CheckBoxColumn from '@components/table/columns/CheckBoxColumn';
import StatusColumn from '@components/table/columns/StatusColumn';
import TableLinkColumn from '@components/table/columns/TableLinkColumn';
import TableWrapper from '@components/table/tableWrapper/TableWrapper';
import Thead from '@components/table/thead/Thead';
import Toolbar from '@components/table/toolbar/Toolbar';
import HeaderCheckBox from '@src/components/table/bulkActions/HeaderCheckBox';
import { IHome } from '@thatmemories/yup';

const HomeTable = (): JSX.Element => {
  const requestConfig = queryConfig.homes;
  const {
    data: homes,
    pagination,
    isLoading,
  } = useGetOnes<IHome[]>(requestConfig);

  const {
    handleCheckBoxChange,
    checkedBoxesIds,
    updateAllCheckBoxes,
    isCheckedAll,
    toggleRowSelection,
  } = useBulkActions(homes);

  return (
    <TableWrapper
      isLoading={isLoading}
      pagination={pagination}
      requestConfig={requestConfig}
    >
      <Toolbar sortOptions={[]} searchBy="versionName" />
      <table className="shared-table">
        <thead>
          <tr>
            <HeaderCheckBox
              updateAllCheckBoxes={updateAllCheckBoxes}
              isChecked={isCheckedAll}
            />
            <Thead fieldName="Version name" sortBy="versionName" />
            <th>Featured collections</th>
            <th>Featured products</th>
            <th>Featured posts</th>
            <Thead fieldName="status" sortBy="status" />
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {homes?.map((home) => (
            <tr
              key={home._id}
              onClick={() => toggleRowSelection(home._id)}
              className={
                !!home._id && checkedBoxesIds.includes(home._id)
                  ? 'selected-row'
                  : ''
              }
            >
              <CheckBoxColumn
                checkedBoxesIds={checkedBoxesIds}
                handleCheckBoxChange={handleCheckBoxChange}
                id={home._id}
              />
              <TableLinkColumn
                _id={home._id}
                requestConfig={queryConfig.homes}
                text={home.versionName}
              />
              <td>{home.featuredCollections?.length || 0}</td>
              <td>{home.featuredProducts?.length || 0}</td>
              <td>{home.featuredPosts?.length || 0}</td>

              <StatusColumn
                requestConfig={requestConfig}
                status={home.status}
                id={home._id}
              />
              <ActionsColumn requestConfig={requestConfig} id={home._id} />
            </tr>
          ))}
        </tbody>
      </table>
      {checkedBoxesIds.length > 0 && (
        <BulkActions
          checkedBoxesIds={checkedBoxesIds}
          requestConfig={requestConfig}
        />
      )}
    </TableWrapper>
  );
};

export default HomeTable;
