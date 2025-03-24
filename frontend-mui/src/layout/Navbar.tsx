import { Select } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Mode } from "react-hook-form";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import useZustandForm from "../stores/formStore";

export default function ButtonAppBar() {
  const { mode, setMode } = useZustandForm();
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
          <Box sx={{ flexGrow: 1 }}></Box>
          <Typography>Validation Mode:</Typography>
          <Select
            native
            defaultValue={mode}
            onChange={(event) => {
              const mode = event.target.value as Mode;
              setMode(mode);
            }}
            sx={{
              color: "orange",
              "& .MuiSelect-select": {
                backgroundColor: "blue",
              },
            }}
          >
            <option value="all">All</option>
            <option value="onBlur">OnBlur</option>
            <option value="onChange">OnChange</option>
            <option value="onSubmit">OnSubmit</option>
            <option value="onTouched">OnTouched</option>
          </Select>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
