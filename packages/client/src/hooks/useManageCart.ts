import { recalculateCart, restoreCartFromLocalStorage } from '@src/store/cart';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';

const useManageCart = () => {
  const REDUX_CART = 'REDUX_CART_STATE';
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (cart && Array.isArray(cart.items) && cart.items.length > 0) {
      localStorage.setItem(REDUX_CART, JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const savedCart = localStorage.getItem(REDUX_CART);

    if (!savedCart) return;
    const cart = JSON.parse(savedCart);

    dispatch(restoreCartFromLocalStorage(cart));
    dispatch(recalculateCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useManageCart;
