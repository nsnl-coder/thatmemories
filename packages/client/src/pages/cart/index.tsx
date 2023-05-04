import CartHeading from '@src/_pages/cart/CartHeading';
import CartItems from '@src/_pages/cart/CartItems';
import CartSummary from '@src/_pages/cart/CartSummary';
import PaymentMethods from '@src/_pages/cart/PaymentMethods';
import RowContainer from '@src/components/container/RowContainer';
import { useAppSelector } from '@src/hooks/redux';
import Link from 'next/link';

function Cart(): JSX.Element {
  const totalItems = useAppSelector((state) => state.cart.items.length);
  if (totalItems === 0)
    return (
      <RowContainer className="py-4">
        <h3 className="mb-4">Your cart is current empty</h3>
        <Link
          href={'/'}
          className="py-1.5 px-4 bg-primary text-white font-medium"
        >
          Return to shop
        </Link>
      </RowContainer>
    );

  return (
    <RowContainer className="h-full py-8 bg-base-300">
      <div className="flex flex-col md:flex-row md:gap-x-3 lg:gap-x-8  gap-y-8">
        <div className="flex-grow md:space-y-4 order-2">
          <div className="bg-base-100">
            <CartHeading />
          </div>
          <CartItems />
        </div>
        <div className="lg:w-96 md:order-3 md:w-72 self-start flex-shrink-0 flex flex-col gap-y-3">
          <CartSummary />
          <PaymentMethods />
        </div>
      </div>
    </RowContainer>
  );
}

export default Cart;
