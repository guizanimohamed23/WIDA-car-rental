import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Liste = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/cars") // Your backend endpoint
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
      })
      .catch((err) => {
        console.error("Error fetching cars:", err);
      });
  }, []);

  return (
    <>
      <Header />
      <Container sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Vehicles
        </Typography>

        <Grid container spacing={4}>
          {cars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <Card sx={{ maxWidth: 345, mx: "auto" }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={car.image_url}
                  alt={`${car.brand} ${car.model}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x180?text=No+Image";
                  }}
                />
                <CardContent>
                  <Typography variant="h6">
                    {car.brand} {car.model}
                  </Typography>
                  <Typography variant="body2">Year: {car.year}</Typography>
                  <Typography variant="body2">
                    Price: ${car.price_per_day} / day
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`/details/${car.id}`)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button variant="contained" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Liste;
