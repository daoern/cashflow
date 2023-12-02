import { useNavigate } from "react-router-dom";
import { useAuthInfo } from "./authInfo";
import { useEffect } from "react";
import { RoutePath } from "@/routes";

const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  { requireIsAuth }: { requireIsAuth?: boolean } = {},
) => {
  const AuthenticatedComponent = (props: P) => {
    const navigate = useNavigate();
    const authInfo = useAuthInfo();
    requireIsAuth ??= true;

    useEffect(() => {
      if (requireIsAuth && !authInfo.isAuthenticated()) {
        navigate(RoutePath.login);
      } else if (!requireIsAuth && authInfo.isAuthenticated()) {
        navigate(RoutePath.dashboard);
      }
    }, [authInfo]);

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
