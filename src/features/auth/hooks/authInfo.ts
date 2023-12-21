import { RootState, appStore } from "@/stores/appStore";
import { Session } from "@supabase/supabase-js";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export interface AuthInfo {
  session: Session | null;
  getId(): string | undefined;
  isAuthenticated(): boolean;
}

function createAuthInfo(session: Session | null): AuthInfo {
  return {
    session: session,
    getId: () => {
      return session?.user?.id;
    },
    isAuthenticated: () => {
      return session != null;
    },
  };
}

export function useAuthInfo(): AuthInfo {
  const session = useSelector((state: RootState) => state.auth.session);
  return useMemo(() => createAuthInfo(session), [session]);
}

export function getAuthInfo(): AuthInfo {
  const session = appStore.getState().auth.session;
  return createAuthInfo(session);
}
