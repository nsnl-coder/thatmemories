import useBulkActions from '@src/hooks/useBulkActions';

import useGetOnes from '@react-query/query/useGetOnes';
import queryConfig from '@react-query/queryConfig';

import FilePreview from '@components/filePreview/FilePreview';
import BulkActions from '@components/table/bulkActions/BulkActions';
import ActionsColumn from '@components/table/columns/ActionsColumn';
import CheckBoxColumn from '@components/table/columns/CheckBoxColumn';
import IsPinnedColumn from '@components/table/columns/IsPinnedColumn';
import StatusColumn from '@components/table/columns/StatusColumn';
import TableLinkColumn from '@components/table/columns/TableLinkColumn';
import TableWrapper from '@components/table/tableWrapper/TableWrapper';
import Thead from '@components/table/thead/Thead';
import Toolbar from '@components/table/toolbar/Toolbar';
import HeaderCheckBox from '@src/components/table/bulkActions/HeaderCheckBox';
import { ICollection } from '@thatmemories/yup';

const CollectionTable = (): JSX.Element => {
  const requestConfig = queryConfig.collections;
  const {
    data: collections,
    pagination,
    isLoading,
  } = useGetOnes<ICollection[]>(requestConfig);

  const {
    handleCheckBoxChange,
    checkedBoxesIds,
    updateAllCheckBoxes,
    isCheckedAll,
    toggleRowSelection,
  } = useBulkActions(collections);

  return (
    <TableWrapper
      isLoading={isLoading}
      pagination={pagination}
      requestConfig={requestConfig}
    >
      <Toolbar />
      <table className="shared-table">
        <thead>
          <tr>
            <HeaderCheckBox
              updateAllCheckBoxes={updateAllCheckBoxes}
              isChecked={isCheckedAll}
            />
            <th>Photo</th>
            <Thead fieldName="Name" sortBy="name" />
            <Thead fieldName="Pin?" sortBy="isPinned" />
            <Thead fieldName="status" sortBy="status" />
            <Thead fieldName="slug" sortBy="slug" />
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {collections?.map((collection) => (
            <tr
              key={collection._id.toString()}
              onClick={() => toggleRowSelection(collection._id.toString())}
              className={
                !!collection._id &&
                checkedBoxesIds.includes(collection._id.toString())
                  ? 'selected-row'
                  : ''
              }
            >
              <CheckBoxColumn
                checkedBoxesIds={checkedBoxesIds}
                handleCheckBoxChange={handleCheckBoxChange}
                id={collection._id.toString()}
              />
              <td>
                {collection.photo && (
                  <div className="w-12 rounded-md overflow-hidden border ">
                    <FilePreview src={collection.photo} />
                  </div>
                )}
              </td>
              <TableLinkColumn
                _id={collection._id.toString()}
                requestConfig={queryConfig.collections}
                text={collection.name}
              />
              <IsPinnedColumn
                requestConfig={requestConfig}
                id={collection._id.toString()}
                isPinned={collection.isPinned}
              />
              <StatusColumn
                requestConfig={requestConfig}
                status={collection.status}
                id={collection._id.toString()}
              />
              <td>
                <p className="truncate max-w-md">{collection.slug}</p>
              </td>
              <ActionsColumn
                requestConfig={requestConfig}
                id={collection._id.toString()}
              />
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

export default CollectionTable;
