import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/signup", form);
      alert("Compte créé avec succès !");
      navigate("/signin");
    } catch (error) {
      alert("Erreur lors de la création du compte");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="xs"
        sx={{
          minHeight: "calc(100vh - 128px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          py: 4,
        }}
      >
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold">
            Create an account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Username"
              name="name"
              value={form.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#1572D3", "&:hover": { backgroundColor: "#1159a8" } }}
            >
              Sign Up
            </Button>
          </Box>
          <Typography sx={{ mt: 2 }}>
            Already have an account? {" "}
            <Button
              onClick={() => navigate("/signin")}
              sx={{ textTransform: "none", color: "#1572D3", fontWeight: "bold", p: 0, minWidth: 0 }}
            >
              Sign In
            </Button>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            startIcon={<ArrowBackIcon />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "bold",
              px: 4,
              backgroundColor: "#1572D3",
              "&:hover": { backgroundColor: "#1159a8" },
            }}
          >
            Back
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
