import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/signin", {
        email,
        password,
      });

      if (res.data.role === "admin") {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/admin");
      } else if (res.data.role === "user") {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      } else {
        alert("Rôle non autorisé");
      }
    } catch (error) {
      alert("Identifiants invalides");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Connexion Utilisateur
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#1572D3" }}
          >
            Se connecter
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Vous n'avez pas de compte ? {" "}
          <Button
            onClick={() => navigate("/signup")}
            sx={{
              textTransform: "none",
              color: "#1572D3",
              fontWeight: "bold",
              p: 0,
              minWidth: 0,
            }}
          >
            Créer un compte
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignIn;

