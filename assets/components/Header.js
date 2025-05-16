import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Header = ({ toggleDarkMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLoggedIn = !!sessionStorage.getItem("access_token");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "#444" : "#70c7e9",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", maxWidth: "100%", px: 2 }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Logo
        </Typography>

        <Box>
          <DarkModeToggle onToggle={toggleDarkMode} mode={theme.palette.mode} />

          {isLoggedIn && (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                fontWeight: "bold",
                ml: 1,
                "&:hover": {
                  backgroundColor: theme.palette.mode === "dark" ? "#333" : "#5aafc9",
                },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
