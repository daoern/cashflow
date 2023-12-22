import { useNavigate } from "react-router-dom";
import { useAuthInfo } from "./authInfo";
import { useEffect } from "react";
import { RoutePath } from "@/routes";

export enum AuthState {
  signedIn,
  signedOut,
}

const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  {
    allowedStates = [AuthState.signedIn],
  }: { allowedStates?: AuthState[] } = {},
) => {
  const AuthenticatedComponent = (props: P) => {
    const navigate = useNavigate();
    const authInfo = useAuthInfo();

    useEffect(() => {
      if (
        authInfo.isSignedOut() &&
        !allowedStates.includes(AuthState.signedOut)
      ) {
        navigate(RoutePath.login);
      } else if (
        authInfo.isSignedIn() &&
        !allowedStates.includes(AuthState.signedIn)
      ) {
        navigate(RoutePath.dashboard);
      }
    }, [authInfo]);

    if (authInfo.state.status === "loading") {
      return <></>;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
