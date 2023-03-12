import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../components/App/App";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import LoginPage from "../Pages/LoginPage";
import endpoints from "./types";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <ProtectedRoute element={<App />} /> },
      { path: endpoints.login, element: <LoginPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

export const getRouter = (ui: React.ReactElement) =>
  createBrowserRouter([
    {
      path: "/",
      element: ui,
    },
  ]);