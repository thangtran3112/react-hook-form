import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSimple = location.pathname === "/simple";
  const isAdvanced = location.pathname === "/advanced";
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Typography
            component="div"
            onClick={() => navigate("/simple")}
            sx={{
              cursor: "pointer",
              fontWeight: isSimple ? "bold" : "normal",
              color: isSimple ? "inherit" : "lightgray",
            }}
          >
            SIMPLE
          </Typography>
          <Typography
            component="div"
            onClick={() => navigate("/advanced")}
            sx={{
              cursor: "pointer",
              fontWeight: isAdvanced ? "bold" : "normal",
              color: isAdvanced ? "inherit" : "lightgray",
            }}
          >
            ADVANCED
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
