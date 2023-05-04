import { createSlice } from '@reduxjs/toolkit';
import { IOption, IProduct } from '@src/yup/productSchema';
import { ICartItem } from './cart';

export interface SelectOptionPayload extends IOption {
  variantId: string;
}

interface CurrentCartItemState
  extends Omit<ICartItem, 'finalPrice' | 'itemTotal'> {
  allOptionsIds: string[][];
}

const initialState: CurrentCartItemState = {
  _id: '',
  slug: '',
  quantity: 1,
  selectedOptions: [],
  image: '',
  name: '',
  discountPrice: 0,
  allOptionsIds: [],
  price: 0,
  highestOptionPrice: undefined,
};

const currentCartItemSlice = createSlice({
  name: 'currentCartItem',
  initialState,
  reducers: {
    // item that user is currently viewing
    resetCurrentItemState(state) {
      return initialState;
    },
    setCurrentCartItem(state, { payload }: { payload: IProduct }) {
      const allOptionsIds =
        payload.variants?.map((variant) => {
          return variant.options.map((option) => option._id!);
        }) || [];

      state.allOptionsIds = allOptionsIds;
      state.slug = payload.slug;
      state.quantity = 1;
      state.image = (payload.images && payload.images[1]) || '';
      state.name = payload.name!;
      state._id = payload._id!;
      state.price = payload.price!;
      state.discountPrice = payload.discountPrice || 0;

      state.selectedOptions = payload.variants?.map((variant) => {
        return { ...variant.options[0], variantId: variant._id! } || [];
      });

      // TODO: get coorect highest price
    },
    selectOption(state, { payload }: { payload: SelectOptionPayload }) {
      const newOption = payload;
      const newOptionId = newOption._id!;

      // check if option exist
      const index = state.allOptionsIds.findIndex((options) =>
        options.includes(newOptionId),
      );

      if (index === -1) return;

      // remove option in same variant
      const selectedOptions = state.selectedOptions;
      const filteredOptions = selectedOptions.filter((option) => {
        const sameVariantOptionsIds = state.allOptionsIds[index];
        return !sameVariantOptionsIds.includes(option._id!);
      });

      state.selectedOptions = [...filteredOptions, newOption];

      if (newOption.photo) {
        state.image = newOption.photo;
      }
      state.price = 666;

      const highestOptionPrice: number = state.selectedOptions.reduce(
        (highestPrice, option) =>
          option.price && option.price > highestPrice
            ? option.price
            : highestPrice,
        0,
      );

      if (highestOptionPrice > 0) {
        state.highestOptionPrice = highestOptionPrice;
      } else {
        state.highestOptionPrice = undefined;
      }
    },
    changeCurrentItemQuantity(
      state,
      { payload }: { payload: string | number },
    ) {
      if (payload === '') {
        state.quantity = '';
        return;
      }

      const quantity = Number(payload);
      const isNumber = !isNaN(quantity);

      if (!isNumber) {
        state.quantity = 1;
        return;
      }

      if (quantity > 999) {
        state.quantity = 999;
        return;
      }

      if (quantity <= 0) {
        state.quantity = 1;
        return;
      }

      state.quantity = quantity;
    },
    increaseQuantity(state) {
      if (state.quantity) {
        state.quantity++;
      } else {
        state.quantity = 1;
      }
    },
    decreaseQuantity(state) {
      if (state.quantity && state.quantity > 1) {
        state.quantity--;
      }
    },
    resetState(state) {
      return initialState;
    },
  },
});

const currentCartItemReducer = currentCartItemSlice.reducer;

export default currentCartItemReducer;
export const {
  setCurrentCartItem,
  selectOption,
  changeCurrentItemQuantity,
  decreaseQuantity,
  resetState,
  resetCurrentItemState,
} = currentCartItemSlice.actions;
