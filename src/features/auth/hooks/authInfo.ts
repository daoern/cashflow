import { RootState, appStore } from "@/stores/appStore";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import createAuthInfo, { AuthInfo } from "../types/authInfo";

export function useAuthInfo(): AuthInfo {
  const authState = useSelector((state: RootState) => state.auth);
  return useMemo(() => createAuthInfo(authState), [authState]);
}

export function getAuthInfo(): AuthInfo {
  const authState = appStore.getState().auth;
  return createAuthInfo(authState);
}
