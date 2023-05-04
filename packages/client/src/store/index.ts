import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import cartReducer from './cart';
import checkoutReducer from './checkout';
import currentCartItemReducer from './currentCartItem';
import notifyModalsReducer from './notifyModals';
import productCarouselReducer from './productCarousel';

//
export const store = configureStore({
  reducer: {
    auth: authReducer,
    productCarousel: productCarouselReducer,
    currentCartItem: currentCartItemReducer,
    cart: cartReducer,
    notifyModals: notifyModalsReducer,
    checkout: checkoutReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
