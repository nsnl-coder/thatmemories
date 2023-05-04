import { useAppSelector } from '@src/hooks/redux';

function CartHeading(): JSX.Element {
  const totalItems = useAppSelector((state) => state.cart.items.length);

  return (
    <div className="px-6 py-4 text-2xl font-medium">
      <h1> Shopping cart {totalItems ? `(${totalItems})` : null}</h1>
    </div>
  );
}

export default CartHeading;
