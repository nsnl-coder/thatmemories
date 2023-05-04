import { useAppSelector } from '@src/hooks/redux';
import CartItem from './CartItem';

function CartItems(): JSX.Element {
  const items = useAppSelector((state) => state.cart.items);

  return (
    <div className="flex flex-col gap-y-2">
      {items.map((item) => (
        <CartItem key={item._id} cartItem={item} />
      ))}
    </div>
  );
}

export default CartItems;
