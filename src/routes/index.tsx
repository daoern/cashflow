import { RouteObject, createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import RoutePath from "@/routes/routePath";
import Dashboard from "@/features/dashboard";
import LoginPage from "@/features/auth/components/LoginPage";

function getRouteMapping(): RouteObject[] {
  return [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: RoutePath.dashboard,
          element: <Dashboard />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
      ],
    },
  ];
}

export const appRouter = createBrowserRouter(getRouteMapping());
