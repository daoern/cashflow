import authReducer from "@/features/auth/slice/authSlice";
import profileReducer from "@/features/user/slice/profileSlice";
import cashAccountReducer from "@/features/account/slice/accountSlice";
import { configureStore } from "@reduxjs/toolkit";

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    user: profileReducer,
    cashAccount: cashAccountReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
