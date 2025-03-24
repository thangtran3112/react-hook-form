import { createBrowserRouter, Navigate } from "react-router";
import SimpleUser from "../simple/pages/SimpleUser";
import { UsersProvider } from "../advanced/pages/UsersProvider";
import Layout from "../layout/Layout";
import NotFound from "../layout/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="advanced" replace />, // ✅ redirect from "/" to "/advanced"
      },
      {
        path: "advanced",
        element: <UsersProvider />,
      },
      {
        path: "simple",
        element: <SimpleUser />,
      },
    ],
  },
]);
