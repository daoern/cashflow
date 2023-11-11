import authReducer from "@/features/auth/slice/authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
