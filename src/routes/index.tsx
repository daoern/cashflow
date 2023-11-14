import { RouteObject, createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Dashboard from "@/features/dashboard";
import LoginPage from "@/features/auth/pages/LoginPage";

abstract class RouteName {
  static readonly dashboard = "dashboard";
  static readonly login = "login";
}
export class RoutePath {
  static readonly dashboard = RouteName.dashboard;
  static readonly login = RouteName.login;
}

function getRouteMapping(): RouteObject[] {
  return [
    {
      path: "/",
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
      ],
    },
  ];
}

export const appRouter = createBrowserRouter(getRouteMapping());
