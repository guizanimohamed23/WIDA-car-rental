import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarCard from "../components/CarCard";
import carImage from "../assets/carkbira.png";
import carImage2 from "../assets/Group 3.png";
import mapImage from "../assets/mapp.png";

function Home() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/cars")
      .then((res) => res.json())
      .then((data) => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);
        setCars(selected);
      })
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  return (
    <>
      <Header />
      <Box>
        {/* Hero Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem",
            backgroundColor: "#F5F5F5",
            marginTop: 2,
          }}
        >
          <Box sx={{ textAlign: "left", maxWidth: "500px" }}>
            <Typography variant="h3" fontWeight="bold">
              Location simple et{" "}
              <span style={{ color: "#1572D3" }}>Abordable</span>
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Avec plus de 20 ans d'expérience, AIRCAR est un des principaux
              loueurs de voitures au Maroc.
            </Typography>
          </Box>
          <Box
            component="img"
            src={carImage}
            alt="Car"
            sx={{ maxWidth: "50%", marginLeft: 4 }}
          />
        </Box>

        {/* Pourquoi Nous Choisir */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "4rem",
            backgroundColor: "white",
            marginTop: 2,
          }}
        >
          <Box sx={{ maxWidth: "50%" }}>
            <Box
              component="img"
              src={carImage2}
              alt="Car"
              sx={{ width: "100%" }}
            />
          </Box>
          <Box sx={{ maxWidth: "45%" }}>
            <Typography variant="h3" fontWeight="bold" color="#1572D3">
              Pourquoi nous choisir ?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2, fontSize: "20px" }}>
              Votre location de voiture, urbaine ou familiale.
            </Typography>
            <ul
              style={{
                listStyleType: "none",
                paddingLeft: 0,
                marginTop: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {[
                {
                  icon: <MonetizationOnIcon />,
                  title: "Nos tarifs",
                  description: "Nos prix sont compétitifs et avantageux.",
                },
                {
                  icon: <CalendarMonthIcon />,
                  title: "Disponibilité",
                  description: "Vous pouvez réserver à tout moment.",
                },
                {
                  icon: <LocationOnIcon />,
                  title: "Proximité",
                  description:
                    "Nous sommes présents dans 11 villes avec 14 agences.",
                },
                {
                  icon: <CelebrationIcon />,
                  title: "Notre offre",
                  description:
                    "Nos véhicules sont diversifiés et adaptés à vos besoins.",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                  }}
                >
                  <Box sx={{ marginRight: 2 }}>{item.icon}</Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2">{item.description}</Typography>
                  </Box>
                </li>
              ))}
            </ul>
          </Box>
        </Box>

        {/* Nos véhicules */}
        <Box id="voitures" sx={{ textAlign: "center", marginTop: 4 }}>
          <Typography variant="h3" fontWeight="bold" color="#1572D3">
            Nos véhicules
          </Typography>
        </Box>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: 3 }}
        >
          {cars.map((car) => (
            <Grid item xs={12} sm={6} md={3} key={car.id}>
              <CarCard
                id={car.id}
                name={`${car.brand} ${car.model}`}
                price={`${car.price_per_day}€/jour`}
                image={
                  car.image_url ||
                  "https://via.placeholder.com/300x180?text=No+Image"
                }
                mileage={car.mileage}
                fuel={car.fuel_type}
                transmission={car.transmission}
                year={car.year}
                label={car.label} // Optional: if you have labels like "Great Price"
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: "center", marginTop: 4, marginBottom: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1572D3",
              color: "white",
              padding: "12px 24px",
              fontSize: "16px",
              "&:hover": { backgroundColor: "#1159a8" },
            }}
            onClick={() => navigate("/liste")}
          >
            Voir tous les véhicules
          </Button>
        </Box>

        {/* Carte des agences */}
        <Box id="agences" textAlign="center" mt={4}>
          <Typography variant="h3" fontWeight="bold" color="#1572D3">
            Nos Agences
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2, fontSize: "20px" }}>
            Découvrez notre agence à Sousse
          </Typography>
          <Box sx={{ position: "relative", mt: 3, display: "inline-block" }}>
            <img src={mapImage} alt="Carte Tunisie" style={{ width: "80%" }} />
            <Button
              variant="contained"
              startIcon={<LocationOnIcon />}
              sx={{
                position: "absolute",
                top: "45%",
                left: "53%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "red",
                color: "white",
                fontSize: "12px",
                padding: "4px 8px",
              }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/dir/35.8353573,10.5950004/35.8079177,10.6099281/@35.806068,10.6200804,13.58z/data=!4m4!4m3!1m1!4e1!1m0?entry=ttu",
                  "_blank"
                )
              }
            >
              SOUSSE
            </Button>
          </Box>
        </Box>

        {/* Contact */}
        <Box id="contact" sx={{ textAlign: "center", marginTop: 4 }}>
          <Typography variant="h3" fontWeight="bold" color="#1572D3">
            Contactez-nous
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2, fontSize: "20px" }}>
            Pour toute question, n'hésitez pas à nous contacter.
          </Typography>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Home;
