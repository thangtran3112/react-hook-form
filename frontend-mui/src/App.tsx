import { RouterProvider } from "react-router";
import { router } from "./routes/route";

export function App() {
  return <RouterProvider router={router} />;
}
