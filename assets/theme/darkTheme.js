// assets/theme/darkTheme.js
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e0e0e0", 
      contrastText: "#000",
    },
    secondary: {
      main: "#bdbdbd", 
    },
    background: {
      default: "#121212", 
      paper: "#1e1e1e",   
    },
    text: {
      primary: "#ffffff",  
      secondary: "#cccccc", 
      disabled: "#777777",  
    },
    error: {
      main: "#f44336", 
    },
    warning: {
      main: "#ffa726", 
    },
    info: {
      main: "#90caf9", 
    },
    success: {
      main: "#66bb6a", 
    },
    divider: "#333333", 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#333333",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#444444",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&:hover": {
            color: "#cccccc",
          },
        },
      },
    },
  },
});

export default darkTheme;
