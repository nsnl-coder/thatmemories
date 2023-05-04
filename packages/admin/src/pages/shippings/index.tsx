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
import { IShipping } from '@thatmemories/yup';

const ShippingTable = (): JSX.Element => {
  const requestConfig = queryConfig.shippings;
  const {
    data: shippings,
    pagination,
    isLoading,
  } = useGetOnes<IShipping[]>(requestConfig);

  const {
    handleCheckBoxChange,
    checkedBoxesIds,
    updateAllCheckBoxes,
    isCheckedAll,
    toggleRowSelection,
  } = useBulkActions(shippings);

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
            <Thead fieldName="Name" sortBy="name" />
            <Thead fieldName="Fees" sortBy="fees" />
            <Thead fieldName="Status" sortBy="status" />
            <th>Estimation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shippings?.map((shipping) => (
            <tr
              key={shipping._id}
              onClick={() => toggleRowSelection(shipping._id)}
              className={
                !!shipping._id && checkedBoxesIds.includes(shipping._id)
                  ? 'selected-row'
                  : ''
              }
            >
              <CheckBoxColumn
                checkedBoxesIds={checkedBoxesIds}
                handleCheckBoxChange={handleCheckBoxChange}
                id={shipping._id}
              />
              <TableLinkColumn
                _id={shipping._id.toString()}
                requestConfig={queryConfig.shippings}
                text={shipping.display_name}
              />
              <td>{shipping.fees}</td>
              <StatusColumn
                requestConfig={requestConfig}
                status={shipping.status}
                id={shipping._id}
              />
              <td>{shipping.delivery_estimation}</td>
              <ActionsColumn requestConfig={requestConfig} id={shipping._id} />
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

export default ShippingTable;
