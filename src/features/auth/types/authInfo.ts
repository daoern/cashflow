import { AuthDataState } from "./authDataState";

export type AuthInfo = {
  state: AuthDataState;
  getId(): string | undefined;
  getEmail(): string | undefined;
  isSignedIn(): boolean;
  isSignedOut(): boolean;
};

export default function createAuthInfo(state: AuthDataState): AuthInfo {
  function getId(): string | undefined {
    return state?.session?.user?.id;
  }

  function getEmail(): string | undefined {
    return state?.session?.user?.email;
  }

  function isSignedIn(): boolean {
    return state?.status === "completed" && state?.session != null;
  }

  function isSignedOut(): boolean {
    return state?.status === "completed" && state?.session == null;
  }

  return {
    state: state,
    getId: getId,
    getEmail: getEmail,
    isSignedIn: isSignedIn,
    isSignedOut: isSignedOut,
  };
}
