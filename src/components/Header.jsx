import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
} from "@mui/material";
import logo from "../assets/car logo 2.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleScrollToSection = (id) => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleGoToHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "white", boxShadow: "none", zIndex: 1000 }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box onClick={handleGoToHome} sx={{ cursor: "pointer" }}>
            <img src={logo} alt="Car Logo" style={{ height: "40px" }} />
          </Box>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button sx={{ color: "black" }} onClick={handleGoToHome}>
              ACCUEIL
            </Button>
            <Button sx={{ color: "black" }} onClick={() => handleScrollToSection("voitures")}>
              NOS VOITURES
            </Button>
            <Button sx={{ color: "black" }} onClick={() => handleScrollToSection("agences")}>
              NOS AGENCES
            </Button>
            <Button sx={{ color: "black" }} onClick={() => handleScrollToSection("contact")}>
              CONTACT
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            {user ? (
              <>
                <Typography sx={{ color: "black", fontWeight: "bold", alignSelf: "center" }}>
                  {user.role === "admin" ? "Admin" : user.name || user.user?.name}
                </Typography>
                <Button onClick={handleLogout} sx={{ color: "black" }}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Button
                  sx={{ color: "black" }}
                  onClick={() => navigate("/popup")}
                >
                  CONNEXION
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  sx={{ color: "red", fontWeight: "bold" }}
                >
                  INSCRIPTION
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
