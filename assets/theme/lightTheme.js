// assets/theme/lightTheme.js
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",  
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#757575",  
    },
    background: {
      default: "#f5f5f5",  
      paper: "#ffffff",     
    },
    text: {
      primary: "#212121",  
      secondary: "#616161", 
      disabled: "#9e9e9e",  
    },
    divider: "#e0e0e0",  
    error: {
      main: "#d32f2f",
    },
    warning: {
      main: "#fbc02d",
    },
    info: {
      main: "#1976d2",
    },
    success: {
      main: "#388e3c",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#0d47a1",
          "&:hover": {
            color: "#1565c0",
          },
        },
      },
    },
  },
});

export default lightTheme;
