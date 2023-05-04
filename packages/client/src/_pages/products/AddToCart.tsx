import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { ICartItem, addItemToCart, recalculateCart } from '@src/store/cart';
import { openSuccessModal } from '@src/store/notifyModals';
import { useEffect, useState } from 'react';

function AddToCart(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCartItem = useAppSelector((state) => state.currentCartItem);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const totalItems = useAppSelector((state) => state.cart.items.length);

  const handleAddToCart = () => {
    let item: ICartItem = {
      ...currentCartItem,
      quantity: currentCartItem.quantity ? currentCartItem.quantity : 1,
      itemTotal: 0,
      finalPrice: 0,
    };

    dispatch(addItemToCart(item));
    dispatch(recalculateCart());
    setIsAdded(true);
  };

  useEffect(() => {
    if (isAdded) {
      dispatch(
        openSuccessModal({
          message: ` A new item has been added to your Shopping Cart. You now have
          ${totalItems} items in your Shopping Cart.`,
          leftButtonText: 'view shopping cart',
          leftButtonLink: '/cart',
          rightButtonText: 'Continue shopping',
        }),
      );
      setIsAdded(false);
    }
  }, [isAdded, totalItems, dispatch]);

  return (
    <button
      className="flex-grow px-6 hover:opacity-80 py-2 text-white text-lg font-medium rounded-sm w-full bg-primary"
      type="button"
      onClick={handleAddToCart}
    >
      Add to cart
    </button>
  );
}

export default AddToCart;
