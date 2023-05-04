import { useAppSelector } from '@src/hooks/redux';
import { IShipping } from '@src/yup/shippingSchema';
import { BsInfoCircleFill } from 'react-icons/bs';

interface Props {
  method: IShipping;
  handleAddShipping: (method: IShipping) => void;
}

function ShippingMethod(props: Props): JSX.Element {
  const shippingMethod = useAppSelector((state) => state.cart.shippingMethod);
  const { method, handleAddShipping } = props;
  const isCouponFreeship = useAppSelector(
    (state) => state.cart.cartCoupon.isFreeshipping,
  );
  const subTotal = useAppSelector((state) => state.cart.subTotal);

  const isFreeshiping =
    method.fees === 0 ||
    isCouponFreeship ||
    (method.freeshipOrderOver && subTotal > method.freeshipOrderOver);

  return (
    <div
      key={method._id}
      className="px-4 flex gap-x-3 py-2 items-center cursor-pointer"
      onClick={() => handleAddShipping(method)}
    >
      <input
        type="radio"
        name="radio-1"
        className="radio radio-xs"
        readOnly
        checked={method._id === shippingMethod}
      />
      <div className="flex-grow">
        <div className="text-md first-letter:capitalize">
          {method.display_name}
        </div>
        <div className="text-sm text-text/70">{method.delivery_estimation}</div>
      </div>
      <div className="font-medium flex items-center gap-x-2">
        {isFreeshiping ? 'Free' : `$${method.fees}`}
        {!isFreeshiping && method.freeshipOrderOver ? (
          <div
            className="tooltip tooltip-left md:tooltip-top"
            data-tip={`Freeship for order over $${method.freeshipOrderOver}`}
          >
            <BsInfoCircleFill size={14} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ShippingMethod;
