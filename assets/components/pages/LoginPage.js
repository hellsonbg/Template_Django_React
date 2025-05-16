import React, { useState } from "react";
import { Button, TextField, Typography, Box, Container, CssBaseline, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://10.129.14.101:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Usuário ou senha inválidos");
        } else {
          throw new Error("Erro no servidor. Tente novamente mais tarde.");
        }
      }

      const data = await response.json();
      console.log("Token:", data);

      // Para segurança extra, use sessionStorage (sessão apenas)
      sessionStorage.setItem("access_token", data.access);
      sessionStorage.setItem("refresh_token", data.refresh);

      // Redireciona para o painel
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CssBaseline />
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: '100%' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5" color="primary" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleLogin} noValidate style={{ width: "100%" }}>
              <TextField
                variant="outlined"
                label="Usuário"
                fullWidth
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                variant="outlined"
                label="Senha"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: 2 }}
              />

              {error && (
                <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{
                  padding: "10px",
                  fontWeight: "bold",
                  backgroundColor: theme.palette.mode === "dark" ? "#444" : "#70c7e9",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "#333" : "#5aafc9",
                  },
                }}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <Box sx={{ mt: 2 }}>
              <Link
                to="/forgot-password"
                style={{
                  textAlign: "center",
                  color: theme.palette.mode === "dark" ? "#70c7e9" : "#000",
                  textDecoration: "none",
                }}
              >
                Esqueci minha senha
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
