import { RouteObject } from "react-router-dom";
import Root from "../Root";
import RoutePath from "./RoutePath";
import Dashboard from "@/pages/dashboard/Dashboard";

export default function getRouteMapping(): RouteObject[] {
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
