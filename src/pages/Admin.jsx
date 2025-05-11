import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Admin = () => {
  const [cars, setCars] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCarId, setCurrentCarId] = useState(null);
  const [carData, setCarData] = useState({
    id: "",
    brand: "",
    model: "",
    year: "",
    price_per_day: "",
    image_url: "",
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:3001/cars");
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Erreur de chargement des voitures :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/cars/${id}`, {
        method: "DELETE",
      });
      fetchCars();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleOpenDialog = () => {
    setEditMode(false);
    setCarData({
      id: "",
      brand: "",
      model: "",
      year: "",
      price_per_day: "",
      image_url: "",
    });
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (car) => {
    setEditMode(true);
    setCurrentCarId(car.id);
    setCarData(car);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCarData({
      id: "",
      brand: "",
      model: "",
      year: "",
      price_per_day: "",
      image_url: "",
    });
    setEditMode(false);
    setCurrentCarId(null);
  };

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { brand, model, year, price_per_day, image_url } = carData;
    if (!brand || !model || !year || !price_per_day || !image_url) {
      alert("Tous les champs sont obligatoires !");
      return;
    }

    try {
      if (editMode) {
        // Update car
        await fetch(`http://localhost:3001/cars/${currentCarId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(carData),
        });
      } else {
        // Add new car
        await fetch("http://localhost:3001/cars", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(carData),
        });
      }

      fetchCars();
      handleCloseDialog();
    } catch (error) {
      console.error("Erreur lors de l'opération :", error);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Tableau de bord Admin
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          sx={{ mb: 2 }}
        >
          Ajouter une voiture
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Marque</TableCell>
                <TableCell>Modèle</TableCell>
                <TableCell>Année</TableCell>
                <TableCell>Prix / jour</TableCell>
                <TableCell>Image URL</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.id}</TableCell>
                  <TableCell>{car.brand}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>{car.price_per_day}</TableCell>
                  <TableCell>{car.image_url}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={() => handleOpenEditDialog(car)}
                      sx={{ mr: 1 }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(car.id)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{editMode ? "Modifier la voiture" : "Ajouter une voiture"}</DialogTitle>
          <DialogContent>
            {["id", "brand", "model", "year", "price_per_day", "image_url"].map(
              (field) => (
                <TextField
                  key={field}
                  label={field.replace(/_/g, " ").toUpperCase()}
                  name={field}
                  fullWidth
                  margin="normal"
                  value={carData[field]}
                  onChange={handleChange}
                  disabled={editMode && field === "id"} // disable ID when editing
                />
              )
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {editMode ? "Mettre à jour" : "Ajouter"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </>
  );
};

export default Admin;
