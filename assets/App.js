import React, { useContext, useMemo,useEffect  } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ThemeContext } from "./ThemeContext";
import lightTheme from "./theme/lightTheme";
import darkTheme from "./theme/darkTheme";
import DarkModeToggle from "./components/DarkModeToggle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import Header from "./components/Header";

export default function App() {
  const { mode, toggleTheme } = useContext(ThemeContext);

  // Gera o tema baseado no modo do contexto
  const theme = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);
  useEffect(() => {
  console.log("Tema atual no App (state):", mode);
}, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header toggleDarkMode={toggleTheme} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
