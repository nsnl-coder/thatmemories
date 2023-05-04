import { useAppSelector } from '@src/hooks/redux';
import useCheckCouponValidity from '@src/react-query/coupons/useCheckCouponValidity';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface Props {
  className?: string;
}

function ApplyCoupon(props: Props): JSX.Element {
  const { className } = props;
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponError, setCouponError] = useState<string>('');

  const subTotal = useAppSelector((state) => state.cart.subTotal);
  const cartCoupon = useAppSelector((state) => state.cart.cartCoupon);

  const { checkCouponValidity, errorMessage } = useCheckCouponValidity();

  const handleSubmitCoupon = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!couponCode) {
      setCouponError('Coupon can not be empty!');
      return;
    }
    if (!subTotal) return;

    checkCouponValidity({ couponCode, orderTotal: subTotal });
  };

  const handleCouponChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
    setCouponError('');
  };

  useEffect(() => {
    if (!couponCode && cartCoupon.couponCode) {
      setCouponCode(cartCoupon.couponCode);
    }
  }, [cartCoupon.couponCode, couponCode]);

  return (
    <div>
      <form onSubmit={handleSubmitCoupon} className={`${className} flex`}>
        <input
          className="border flex-grow outline-none px-3 h-9 rounded-l-md"
          placeholder="Enter your coupon to get extra discount!"
          onChange={handleCouponChange}
          value={couponCode}
          onFocus={() => setCouponError('')}
        />
        <button
          className="bg-neutral text-neutral-content px-4 rounded-r-md"
          type="submit"
        >
          Apply coupon
        </button>
      </form>
      {couponError && <p className="text-error mt-1">{couponError}</p>}
      {errorMessage && <p className="text-error mt-1">{errorMessage}</p>}
      {cartCoupon.discountAmount && cartCoupon.discountUnit && !errorMessage ? (
        <div className="text-green-600 mt-2">
          {cartCoupon.discountAmount}
          {cartCoupon.discountUnit} off your total order
          {cartCoupon.isFreeshipping ? ' + free delivery!' : ''}
        </div>
      ) : null}
    </div>
  );
}

export default ApplyCoupon;
