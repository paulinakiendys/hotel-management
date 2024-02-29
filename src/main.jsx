import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Root from "./routes/Root";
import NotFound from "./routes/NotFound";
import Dashboard from "./routes/Dashboard";
import Rooms from "./routes/Rooms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate replace to="dashboard" />,
      },
      { path: "dashboard", element: <Dashboard /> },
      { path: "rooms", element: <Rooms /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
