import { createSlice } from '@reduxjs/toolkit';

export enum NOTIFY_MODALS {
  CART_ITEM_ADDED = 'CART_ITEM_ADDED',
  ERROR_MODAL = 'UNEXPECTED_ERROR_HAPPENED',
  LITTLE_TOAST = 'LITTLE_TOAST',
  SUCCESS_MODAL = 'SUCCESS_MODAL',
}

interface AlertModalsState {
  currentOpenedModal: NOTIFY_MODALS | null;
  message: string | undefined;
  leftButtonText?: string;
  leftButtonLink?: string;
  rightButtonText?: string;
  rightButtonLink?: string;
}

const initialState: AlertModalsState = {
  currentOpenedModal: null,
  message: undefined,
};

const notifyModalsSlice = createSlice({
  name: 'notifyModals',
  initialState,
  reducers: {
    openAddedItemSuccessModal(state) {
      state.currentOpenedModal = NOTIFY_MODALS.CART_ITEM_ADDED;
    },
    openErrorModal(state, { payload }: { payload: { message: string } }) {
      state.currentOpenedModal = NOTIFY_MODALS.ERROR_MODAL;
      state.message = payload.message;
    },
    openSuccessModal(
      state,
      { payload }: { payload: Omit<AlertModalsState, 'currentOpenedModal'> },
    ) {
      state.currentOpenedModal = NOTIFY_MODALS.SUCCESS_MODAL;
      state.message = payload.message;
      state.leftButtonLink = payload.leftButtonLink;
      state.rightButtonLink = payload.rightButtonLink;
      state.leftButtonText = payload.leftButtonText;
      state.rightButtonText = payload.rightButtonText;
    },
    closeNotifyModal(state) {
      return initialState;
    },
    openLittleToast(state, { payload }: { payload: { message: string } }) {
      state.currentOpenedModal = NOTIFY_MODALS.LITTLE_TOAST;
      state.message = payload.message;
    },
  },
});

const notifyModalsReducer = notifyModalsSlice.reducer;

export default notifyModalsReducer;
export const {
  closeNotifyModal,
  openAddedItemSuccessModal,
  openErrorModal,
  openLittleToast,
  openSuccessModal,
} = notifyModalsSlice.actions;
