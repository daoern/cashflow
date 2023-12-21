import { RouteObject, createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Dashboard from "@/features/dashboard";
import LoginPage from "@/features/auth/pages/LoginPage";
import CashAccountPage from "@/features/account/pages/CashAccountPage";
import EditCashAccountPage from "@/features/account/pages/EditCashAccountPage";

abstract class RouteName {
  static readonly root = "/";
  static readonly dashboard = "dashboard";
  static readonly login = "login";
  static readonly account = "account";
}
export class RoutePath {
  static readonly dashboard = RouteName.root + RouteName.dashboard;
  static readonly login = RouteName.root + RouteName.login;
  static readonly account = RouteName.root + RouteName.account;
}

function getRouteMapping(): RouteObject[] {
  return [
    {
      path: RouteName.root,
      element: <Root />,
      children: [
        {
          path: RouteName.dashboard,
          element: <Dashboard />,
        },
        {
          path: RouteName.login,
          element: <LoginPage />,
        },
        {
          path: RouteName.account,
          element: <CashAccountPage />,
          children: [
            {
              path: "add",
              element: <EditCashAccountPage />,
            },
          ],
        },
      ],
    },
  ];
}

export const appRouter = createBrowserRouter(getRouteMapping());
