import { useAppSelector } from '@src/hooks/redux';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function CartSummary(): JSX.Element {
  const subTotal = useAppSelector((state) => state.cart.subTotal);
  const grandTotal = useAppSelector((state) => state.cart.grandTotal);
  const shippingFees = useAppSelector((state) => state.cart.cartShipping.fees);
  const discountInDollar = useAppSelector(
    (auth) => auth.cart.cartCoupon.inDollar,
  );

  return (
    <div className="px-6 flex flex-col gap-y-3 py-4 bg-base-100">
      <h2 className="text-3xl font-semibold mb-3">Summary</h2>
      <div className="flex justify-between">
        <span>Sub total:</span>
        <span className="font-medium">{subTotal}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Shipping fees:</span>
        <div className="flex items-center gap-x-3">
          <AiOutlinePlus size={12} />
          <span className="font-medium">{shippingFees}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span>Discount:</span>
        <div className="flex gap-x-3 items-center">
          <AiOutlineMinus size={10} />
          <span className="font-medium">{discountInDollar}</span>
        </div>
      </div>
      <p className="flex justify-between items-center border-t py-3">
        <span className="font-medium">Total:</span>
        <span className="font-medium text-2xl">${grandTotal}</span>
      </p>
      <Link
        href="/checkout"
        className="bg-primary py-1.5 text-white rounded-full font-medium text-lg hover:brightness-95 text-center"
      >
        Checkout
      </Link>
    </div>
  );
}

export default CartSummary;
