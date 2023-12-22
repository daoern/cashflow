import { AuthDataState } from "./authDataState";

export type AuthInfo = {
  state: AuthDataState;
  getId(): string | undefined;
  getEmail(): string | undefined;
  isSignedOut(): boolean;
  isSignedIn(): boolean;
};

export default function createAuthInfo(state: AuthDataState): AuthInfo {
  function getId(): string | undefined {
    return state?.session?.user?.id;
  }

  function getEmail(): string | undefined {
    return state?.session?.user?.email;
  }

  function isLoggedIn(): boolean {
    return state?.status === "completed" && state?.session != null;
  }

  function isLoggedOut(): boolean {
    return state?.status === "completed" && state?.session == null;
  }

  return {
    state: state,
    getId: getId,
    getEmail: getEmail,
    isSignedOut: isLoggedIn,
    isSignedIn: isLoggedOut,
  };
}
