import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastsProvider } from "./contexts/ToastsContext";
import Root from "./routes/Root";
import NotFound from "./routes/NotFound";
import Dashboard from "./routes/Dashboard";
import Rooms from "./routes/Rooms";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <ToastsProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ToastsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
