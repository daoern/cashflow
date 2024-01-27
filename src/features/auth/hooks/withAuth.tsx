import { useNavigate } from "react-router-dom";
import { useAuthInfo } from "./authInfo";
import { useEffect } from "react";
import { routes } from "@/routes";

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
        navigate(routes.login);
      } else if (
        authInfo.isSignedIn() &&
        !allowedStates.includes(AuthState.signedIn)
      ) {
        navigate(routes.dashboard);
      }
    }, [authInfo]);

    if (authInfo.state.status === "loading") {
      return <></>;
    }

    if (authInfo.state.status === "error") {
      return <p>Authentication Error</p>;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
