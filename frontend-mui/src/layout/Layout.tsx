import { Stack } from "@mui/material";
import { Outlet } from "react-router";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <Stack sx={{ gap: 2 }}>
      <Navbar />
      <Outlet />
    </Stack>
  );
};

export default Layout;
