import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";

function CarCard({
  id,
  name,
  price,
  image,
  mileage,
  fuel,
  transmission,
  year,
  label,
}) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/details/${id}`);
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: "10px", overflow: "hidden" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" height="180" image={image} alt={name} />
        {label && (
          <Chip
            label={label}
            color={label === "Great Price" ? "success" : "primary"}
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              fontWeight: "bold",
              color: "white",
            }}
          />
        )}
      </Box>
      <CardContent sx={{ textAlign: "left" }}>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {mileage} • {fuel} • {transmission} • {year}
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="primary">
          {price}
        </Typography>
        <Button
          variant="text"
          color="primary"
          sx={{ cursor: "pointer", marginTop: 1 }}
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default CarCard;
