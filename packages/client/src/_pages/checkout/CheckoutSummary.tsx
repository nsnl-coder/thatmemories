import { useAppSelector } from '@src/hooks/redux';
import { AiOutlineMinus } from 'react-icons/ai';

function CheckoutSummary(): JSX.Element {
  const subTotal = useAppSelector((state) => state.cart.subTotal);
  const grandTotal = useAppSelector((state) => state.cart.grandTotal);
  const shippingFees = useAppSelector((state) => state.cart.cartShipping.fees);
  const discountInDollar = useAppSelector(
    (auth) => auth.cart.cartCoupon.inDollar,
  );

  return (
    <div className="flex flex-col gap-y-3 bg-base-100 text-text/70">
      <div className="flex justify-between">
        <span>Sub total:</span>
        <span className="font-medium">${subTotal}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Shipping fees:</span>
        <div className="flex items-center gap-x-3">
          {shippingFees === 0 ? (
            <span className="text-green-600 text-sm font-medium">Free</span>
          ) : (
            <span className="text-sm font-medium">${shippingFees}</span>
          )}
        </div>
      </div>
      {discountInDollar > 0 && (
        <div className="flex justify-between items-center">
          <span>Discount:</span>
          <div className="flex gap-x-3 items-center">
            <AiOutlineMinus size={10} />
            <span className="font-medium">${discountInDollar}</span>
          </div>
        </div>
      )}
      <p className="flex justify-between items-center border-t py-3 text-text">
        <span className="font-medium">Total:</span>
        <span className="font-medium">${grandTotal}</span>
      </p>
    </div>
  );
}

export default CheckoutSummary;
