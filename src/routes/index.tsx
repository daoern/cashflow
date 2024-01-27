import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "@/features/dashboard";
import LoginPage from "@/features/auth/pages/LoginPage";
import CashAccountPage from "@/features/account/pages/CashAccountPage";
import AddCashAccountPage from "@/features/account/pages/AddCashAccountPage";
import EditCashAccountPage from "@/features/account/pages/EditCashAccountPage";

export const routes = {
  root: "/",
  dashboard: "/dashboard",
  login: "/login",
  // account
  account: "/account",
  addAccount: "/account/add",
  editAccount: "/account/edit/:id",
} as const;

export type AppRoutes = (typeof routes)[keyof typeof routes];

export type ExtractParam<Path, NextPart> = Path extends `:${infer Param}`
  ? Record<Param, string> & (NextPart extends undefined ? {} : NextPart)
  : NextPart;

export type ExtractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? ExtractParam<Segment, ExtractParams<Rest>>
  : ExtractParam<Path, undefined>;

export type AppRouteParams<Route extends AppRoutes> = ExtractParams<Route>;

export type EditCashAccountPageParams = AppRouteParams<"/account/edit/:id">;

function getRouteMapping(): RouteObject[] {
  return [
    {
      path: routes.root,
      element: <App />,
      children: [
        {
          path: routes.dashboard,
          element: <Dashboard />,
        },
        {
          path: routes.login,
          element: <LoginPage />,
        },
        {
          path: routes.account,
          element: <CashAccountPage />,
          children: [
            {
              path: routes.addAccount,
              element: <AddCashAccountPage />,
            },
            {
              path: routes.editAccount,
              element: <EditCashAccountPage />,
            },
          ],
        },
      ],
    },
  ];
}

export const appRouter = createBrowserRouter(getRouteMapping());
