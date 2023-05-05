import { createSlice } from '@reduxjs/toolkit';
import { StripeAddressElementChangeEvent } from '@stripe/stripe-js';
import { ICoupon, IOrder, IShipping } from '@thatmemories/yup';
import { isEqual, sortBy } from 'lodash';
import { SelectOptionPayload } from './currentCartItem';

interface CartCoupon extends Partial<ICoupon> {
  inDollar: number;
  inPercentage: number;
}

export interface ICartItem {
  _id: string;
  slug: string;
  image: string;
  name: string;
  quantity: number | '';
  price: number;
  discountPrice: number;
  selectedOptions: SelectOptionPayload[];
  highestOptionPrice: number | undefined;
  itemTotal: number;
  finalPrice: number;
}

interface CartState {
  items: Required<ICartItem>[];
  cartShipping: Omit<IShipping, '_id'>;
  cartCoupon: CartCoupon;
  savedToDatabaseAt?: Date | undefined;
  subTotal: number;
  grandTotal: number;
  shippingAddress: IOrder['shippingAddress'];
  fullname?: string;
  shippingMethod?: string;
  phone?: string;
}

const initialState: CartState = {
  items: [],
  subTotal: 0,
  cartCoupon: {
    couponCode: '',
    couponQuantity: 999,
    discountAmount: 0,
    discountUnit: '%',
    inDollar: 0,
    inPercentage: 0,
  },
  shippingAddress: {
    line1: '',
    country: '',
  },
  cartShipping: {
    fees: 0,
  },
  grandTotal: 0,
};

const calculateCart = (
  cart: Pick<CartState, 'items' | 'cartCoupon' | 'cartShipping'>,
) => {
  let subTotal = 0;

  const items = [...cart.items];

  items.forEach((item, index) => {
    const quantity = item.quantity || 1;
    const price = item.highestOptionPrice || item.discountPrice || item.price;
    const total = quantity * price;

    cart.items[index].finalPrice = price;
    cart.items[index].itemTotal = total;
    subTotal += total;
  }, 0);

  // recalculate discount
  const cartCoupon = { ...cart.cartCoupon };

  if (cartCoupon.discountUnit === '$') {
    cartCoupon.inDollar = cartCoupon.discountAmount || 0;
    cartCoupon.inPercentage = Math.floor(
      (cartCoupon.inDollar / subTotal) * 100,
    );
  }

  if (cartCoupon.discountUnit === '%') {
    cartCoupon.inPercentage = cartCoupon.discountAmount || 0;
    cartCoupon.inDollar = Math.floor(subTotal * cartCoupon.inPercentage) / 100;
  }

  if (cartCoupon.minimumOrder && subTotal < cartCoupon.minimumOrder) {
    cartCoupon.inPercentage = 0;
    cartCoupon.inDollar = 0;
  }

  if (cartCoupon.maximumOrder && subTotal > cartCoupon.maximumOrder) {
    cartCoupon.inPercentage = 0;
    cartCoupon.inDollar = 0;
  }

  // recalculate shipping fees
  const cartShipping = { ...cart.cartShipping };

  if (
    cartCoupon.isFreeshipping ||
    (cartShipping.freeshipOrderOver !== undefined &&
      subTotal > cartShipping.freeshipOrderOver)
  ) {
    cartShipping.fees = 0;
  }

  const grandTotal = subTotal + (cartShipping.fees || 0) - cartCoupon.inDollar;

  return {
    ...cart,
    items,
    subTotal,
    grandTotal,
    cartCoupon,
    cartShipping,
  };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCartState(state) {
      return initialState;
    },
    recalculateCart(state) {
      const { subTotal, grandTotal, cartCoupon, cartShipping, items } =
        calculateCart({
          items: state.items,
          cartCoupon: state.cartCoupon,
          cartShipping: state.cartShipping,
        });

      state.grandTotal = grandTotal;
      state.subTotal = subTotal;
      state.cartCoupon = cartCoupon;
      state.cartShipping = cartShipping;
      state.items = items;
    },
    addItemToCart(state, { payload }: { payload: Required<ICartItem> }) {
      const newItem = payload;

      // check if product with same selectedOptions existed
      const index = state.items.findIndex(
        (item) =>
          state.items?.map((item) => item._id).includes(newItem._id) &&
          isEqual(
            sortBy(newItem.selectedOptions.map((option) => option._id)),
            sortBy(item.selectedOptions.map((option) => option._id)),
          ),
      );

      // if item does not exist
      if (index === -1) {
        state.items.push(newItem);
      } else {
        let newQuantity =
          (state.items[index].quantity || 1) + (newItem.quantity || 1);

        if (newQuantity > 999) {
          newQuantity = 999;
        }

        if (newQuantity < 1) {
          newQuantity = 1;
        }

        state.items[index].quantity = newQuantity;
      }
    },
    removeItemFromCart(state, { payload }: { payload: Required<ICartItem> }) {
      const removeItem = payload;

      const items = state.items.filter(
        (item) =>
          item._id !== removeItem._id ||
          !isEqual(
            sortBy(removeItem.selectedOptions),
            sortBy(item.selectedOptions),
          ),
      );

      state.items = items;
    },
    changeCartItemQuantity(state, { payload }: { payload: ICartItem }) {
      const changeItem = payload;

      const index = state.items.findIndex(
        (item) =>
          item._id === changeItem._id &&
          isEqual(
            sortBy(changeItem.selectedOptions),
            sortBy(item.selectedOptions),
          ),
      );

      if (index === -1) return;

      if (changeItem.quantity === '') {
        state.items[index].quantity = '';
        return;
      }

      if (changeItem.quantity > 999) changeItem.quantity = 999;
      if (changeItem.quantity <= 0) changeItem.quantity = 1;
      state.items[index] = changeItem;
    },
    addCouponCode(state, { payload }: { payload: ICoupon }) {
      const coupon = payload;

      state.cartCoupon = {
        ...coupon,
        inDollar: 0,
        inPercentage: 0,
      };
    },
    removeCouponCode(state) {
      state.cartCoupon = initialState.cartCoupon;
    },
    addShippingMethod(state, { payload }: { payload: IShipping }) {
      state.cartShipping = payload;
      state.shippingMethod = payload._id;
    },
    restoreCartFromLocalStorage(state, action) {
      const cart = action.payload;
      if (cart && Array.isArray(cart.items) && cart.items.length > 0) {
        return cart;
      }
    },
    updateShippingInfo(
      state,
      { payload }: { payload: StripeAddressElementChangeEvent['value'] },
    ) {
      state.fullname = payload.name;
      state.shippingAddress = payload.address;
      state.phone = payload.phone;
    },
  },
});

const cartReducer = cartSlice.reducer;

export default cartReducer;
export const {
  addItemToCart,
  removeItemFromCart,
  changeCartItemQuantity,
  restoreCartFromLocalStorage,
  addShippingMethod,
  addCouponCode,
  updateShippingInfo,
  removeCouponCode,
  recalculateCart,
  resetCartState,
} = cartSlice.actions;
