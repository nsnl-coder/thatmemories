import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import previewFileReducer from './previewFile';

//
export const store = configureStore({
  reducer: {
    auth: authReducer,
    previewFile: previewFileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
