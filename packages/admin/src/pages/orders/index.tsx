import BulkActions from '@components/table/bulkActions/BulkActions';
import ActionsColumn from '@components/table/columns/ActionsColumn';
import CheckBoxColumn from '@components/table/columns/CheckBoxColumn';
import MultipleSelect from '@components/table/customFilter/MultipleSelect';
import TableWrapper from '@components/table/tableWrapper/TableWrapper';
import Toolbar from '@components/table/toolbar/Toolbar';
import useGetOnes from '@react-query/query/useGetOnes';
import queryConfig from '@react-query/queryConfig';
import HeaderCheckBox from '@src/components/table/bulkActions/HeaderCheckBox';
import TableLinkColumn from '@src/components/table/columns/TableLinkColumn';
import useBulkActions from '@src/hooks/useBulkActions';
import { IOrder } from '@thatmemories/yup';

const OrderTable = (): JSX.Element => {
  const requestConfig = queryConfig.orders;
  const {
    data: orders,
    pagination,
    isLoading,
  } = useGetOnes<IOrder[]>(requestConfig);

  const {
    handleCheckBoxChange,
    checkedBoxesIds,
    updateAllCheckBoxes,
    isCheckedAll,
    toggleRowSelection,
  } = useBulkActions(orders);

  return (
    <TableWrapper
      isLoading={isLoading}
      pagination={pagination}
      requestConfig={requestConfig}
    >
      <Toolbar>
        <MultipleSelect
          queryField="position"
          fieldValues={['header', 'footer']}
        />
        <MultipleSelect
          queryField="orderType"
          fieldValues={['root', 'nested']}
        />
      </Toolbar>
      <table className="shared-table">
        <thead>
          <tr>
            <HeaderCheckBox
              updateAllCheckBoxes={updateAllCheckBoxes}
              isChecked={isCheckedAll}
            />
            <th>Order number</th>
            <th>Customers</th>
            <th>Subtotal</th>
            <th>Grand total</th>
            <th>Shipping status</th>
            <th>Payment status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr
              key={order._id.toString()}
              onClick={() => toggleRowSelection(order._id.toString())}
              className={
                !!order._id && checkedBoxesIds.includes(order._id.toString())
                  ? 'selected-row'
                  : ''
              }
            >
              <CheckBoxColumn
                checkedBoxesIds={checkedBoxesIds}
                handleCheckBoxChange={handleCheckBoxChange}
                id={order._id.toString()}
              />
              <TableLinkColumn
                text={order.orderNumber}
                _id={order._id.toString()}
                requestConfig={requestConfig}
              />
              <TableLinkColumn
                text={order.fullname}
                _id={order.createdBy.toString()}
                requestConfig={queryConfig.users}
              />
              <td>{order.subTotal}</td>
              <td>{order.grandTotal}</td>
              <td>{order.shippingStatus}</td>
              <td>{order.paymentStatus}</td>
              <ActionsColumn
                requestConfig={requestConfig}
                id={order._id.toString()}
              />
            </tr>
          ))}
        </tbody>
      </table>
      {checkedBoxesIds.length > 0 && (
        <BulkActions
          checkedBoxesIds={checkedBoxesIds}
          requestConfig={requestConfig}
          uiControls={{ showPin: false, showActive: true, showDraft: true }}
        />
      )}
    </TableWrapper>
  );
};

export default OrderTable;
