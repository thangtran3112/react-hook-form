import { Typography } from "@mui/material";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <>
      <Typography>
        The page you are looking for might have been removed or doesn't exist.
      </Typography>
      <Link to="/">Go to Home</Link>
    </>
  );
};

export default NotFound;
