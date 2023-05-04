import { createSlice } from '@reduxjs/toolkit';

import { HttpResponse } from '@src/types/http';
import { IUser } from '@src/yup/userSchema';

interface AuthState {
  isLoggedIn: boolean | undefined;
  user: IUser | undefined;
}

const initialState: AuthState = {
  isLoggedIn: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logUserIn(state, { payload }: { payload: HttpResponse<IUser> }) {
      state.user = payload.data;
      state.isLoggedIn = true;
    },
    failToLogin(state) {
      state.isLoggedIn = false;
      state.user = undefined;
    },
  },
});

const authReducer = authSlice.reducer;

export default authReducer;
export const { logUserIn, failToLogin } = authSlice.actions;
