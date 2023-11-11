import { RouteObject, createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import RoutePath from "@/routes/routePath";
import Dashboard from "@/features/dashboard";

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
      ],
    },
  ];
}

export const appRouter = createBrowserRouter(getRouteMapping());
