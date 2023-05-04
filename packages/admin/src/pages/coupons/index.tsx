import { BsCheck } from 'react-icons/bs';

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
import { ICoupon } from '@thatmemories/yup';

const CouponTable = (): JSX.Element => {
  const requestConfig = queryConfig.coupons;
  const {
    data: coupons,
    pagination,
    isLoading,
  } = useGetOnes<ICoupon[]>(requestConfig);

  const {
    handleCheckBoxChange,
    checkedBoxesIds,
    updateAllCheckBoxes,
    isCheckedAll,
    toggleRowSelection,
  } = useBulkActions(coupons);

  return (
    <TableWrapper
      isLoading={isLoading}
      pagination={pagination}
      requestConfig={requestConfig}
    >
      <Toolbar
        searchBy="couponCode,name"
        sortOptions={[
          ['couponQuantity', 'lowest first', 'highest first'],
          ['usedCoupons', 'lowest first', 'highest first'],
          ['name', 'a-z', 'z-a'],
          ['startDate', 'earliest first', 'latest first'],
          ['endDate', 'earliest first', 'latest first'],
        ]}
      />
      <table className="shared-table">
        <thead>
          <tr>
            <HeaderCheckBox
              updateAllCheckBoxes={updateAllCheckBoxes}
              isChecked={isCheckedAll}
            />
            <Thead fieldName="name" sortBy="name" />
            <Thead fieldName="code" sortBy="couponCode" />
            <Thead fieldName="Freeship?" sortBy="isFreeshipping" />
            <Thead fieldName="coupon quantity" sortBy="couponQuantity" />
            <Thead fieldName="used coupons" sortBy="usedCoupons" />
            <Thead fieldName="status" sortBy="status" />
            <Thead fieldName="start date" sortBy="startDate" />
            <Thead fieldName="expired in" sortBy="endDate" />
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons?.map((coupon) => (
            <tr
              key={coupon._id}
              onClick={() => toggleRowSelection(coupon._id)}
              className={
                !!coupon._id && checkedBoxesIds.includes(coupon._id)
                  ? 'selected-row'
                  : ''
              }
            >
              <CheckBoxColumn
                checkedBoxesIds={checkedBoxesIds}
                handleCheckBoxChange={handleCheckBoxChange}
                id={coupon._id}
              />

              <TableLinkColumn
                _id={coupon._id}
                requestConfig={queryConfig.coupons}
                text={coupon.name}
              />
              <td>
                <span className="uppercase">{coupon.couponCode}</span>
              </td>
              <td>
                {coupon.isFreeshipping ? (
                  <BsCheck className="text-green-600" size={36} />
                ) : (
                  ''
                )}
              </td>
              <td>{coupon.couponQuantity}</td>
              <td>{coupon.usedCoupons}</td>
              <StatusColumn
                requestConfig={requestConfig}
                status={coupon.status}
                id={coupon._id}
              />
              <td>
                {coupon.startDate &&
                  new Date(coupon.startDate).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                    day: 'numeric',
                  })}
              </td>
              <td>{coupon.expiredIn}</td>
              <ActionsColumn requestConfig={requestConfig} id={coupon._id} />
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

export default CouponTable;
