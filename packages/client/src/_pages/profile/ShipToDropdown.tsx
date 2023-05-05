import { IOrder } from '@thatmemories/yup';
import { BsChevronDown } from 'react-icons/bs';

interface Props {
  order: IOrder;
}

function ShipToDropdown(props: Props): JSX.Element {
  const { order } = props;

  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <label tabIndex={0} className="flex items-center gap-x-1">
        <span>{order.fullname}</span>
        <span>
          <BsChevronDown size={10} />
        </span>
      </label>
      <div
        tabIndex={0}
        className="dropdown-content text-sm bg-base-100 p-3 w-60 border rounded-md shadow-lg "
      >
        <div className="uppercase font-medium">{order.fullname}</div>
        <div>{order.shippingAddress.line1},</div>
        <div className="flex gap-x-3 flex-wrap">
          <div>
            {`  ${order.shippingAddress.city}, ${order.shippingAddress.state},
            ${order.shippingAddress.country}`}
          </div>
        </div>

        <div>{order.couponCode}</div>
      </div>
    </div>
  );
}

export default ShipToDropdown;
