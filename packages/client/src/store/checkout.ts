import { createSlice } from '@reduxjs/toolkit';

export enum CHECKOUT_PROGRESS {
  STEP1 = 'Select shipping method and enter coupon',
  STEP2 = 'Collect shipping info',
  STEP3 = 'Collect payment info',
}

interface CheckoutState {
  checkoutProgress: string;
  stepNumber: number;
}

const initialState: CheckoutState = {
  checkoutProgress: CHECKOUT_PROGRESS.STEP2,
  stepNumber: 2,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    goPaymentInfoStep(state) {
      state.checkoutProgress = CHECKOUT_PROGRESS.STEP3;
      state.stepNumber = 3;
    },
    gotoShippingInfoStep(state) {
      state.checkoutProgress = CHECKOUT_PROGRESS.STEP2;
      state.stepNumber = 2;
    },
  },
});

const checkoutReducer = checkoutSlice.reducer;

export default checkoutReducer;
export const { goPaymentInfoStep, gotoShippingInfoStep } =
  checkoutSlice.actions;
