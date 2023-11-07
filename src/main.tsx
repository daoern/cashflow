import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import getRouteMapping from "./route/RouteMapping";
import "./common/i18n/config";
import { Provider } from "react-redux";
import { appStore } from "./stores/appStore";

const router = createBrowserRouter(getRouteMapping());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
