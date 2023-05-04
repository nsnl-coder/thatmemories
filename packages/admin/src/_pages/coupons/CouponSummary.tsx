import { Control, useWatch } from 'react-hook-form';

import getLocaleDateString from '@src/utils/getLocaleDateString';
import { ICoupon } from '@thatmemories/yup';

interface Props {
  control: Control<ICoupon>;
}

function CouponSummary(props: Props): JSX.Element {
  const { control } = props;

  const [
    status,
    couponCode,
    discountAmount,
    discountUnit,
    isFreeshipping,
    endDate,
    startDate,
    minimumOrder,
    maximumOrder,
  ] = useWatch({
    control,
    name: [
      'status',
      'couponCode',
      'discountAmount',
      'discountUnit',
      'isFreeshipping',
      'endDate',
      'startDate',
      'minimumOrder',
      'maximumOrder',
    ],
  });

  return (
    <div>
      <h3 className="font-medium mb-4">Summary</h3>
      <ul className="list-disc px-4 flex gap-y-2 flex-col">
        {status && (
          <li>
            <div className="flex gap-x-3 items-center">
              Status:
              {status === 'draft' ? (
                <span className="badge">draft</span>
              ) : (
                <span className="badge bg-green-500 border-none text-white">
                  active
                </span>
              )}
            </div>
          </li>
        )}
        {couponCode && (
          <li>
            Code: <span className="bg-gray-100">{couponCode}</span>
          </li>
        )}
        {discountAmount && (
          <li>
            {discountAmount}
            {discountUnit} off total order
          </li>
        )}
        {isFreeshipping && <li>Freeshipping</li>}
        {endDate && startDate && (
          <li>
            {`Discount start from
              ${getLocaleDateString(startDate)} -   
                ${getLocaleDateString(endDate)}`}
          </li>
        )}
        {minimumOrder && <li>Only valid for order over {minimumOrder}$ </li>}
        {maximumOrder && <li>Only valid for order under {maximumOrder}$</li>}
      </ul>
    </div>
  );
}

export default CouponSummary;
