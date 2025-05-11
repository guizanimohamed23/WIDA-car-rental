import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

const Details = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    location: "",
    message: "",
  });
  const [licenseFile, setLicenseFile] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching car:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLicenseUpload = (e) => {
    setLicenseFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!licenseFile) {
      alert("Veuillez télécharger votre permis de conduire.");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );
    formData.append("license", licenseFile);
    formData.append("car", `${car.brand} ${car.model}`);

    try {
      await fetch("http://localhost:3001/send-email", {
        method: "POST",
        body: formData,
      });

      // Affiche toujours le succès
      setForm({
        full_name: "",
        phone: "",
        email: "",
        location: "",
        message: "",
      });
      setLicenseFile(null);
      setOpen(true);
    } catch (err) {
      console.error("Erreur réseau :", err);
      // Même en cas d'erreur, afficher le succès
      setOpen(true);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!car) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 10 }}>
        Car not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ bgcolor: "#F5F5F5", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left: Car Image and Info */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={car.image_url}
              alt={car.model}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/500x300?text=No+Image";
              }}
              sx={{
                width: "100%",
                borderRadius: 2,
                objectFit: "cover",
                boxShadow: 3,
              }}
            />

            <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center">
              <Grid item>
                <Box textAlign="center">
                  <PeopleIcon color="primary" />
                  <Typography variant="caption">4 personnes</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box textAlign="center">
                  <AcUnitIcon color="primary" />
                  <Typography variant="caption">Climatisation</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box textAlign="center">
                  <SettingsIcon color="primary" />
                  <Typography variant="caption">Manuelle</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box textAlign="center">
                  <LocalGasStationIcon color="primary" />
                  <Typography variant="caption">Essence</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Right: Reservation Form */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {car.brand} {car.model}
              </Typography>
              <Typography
                variant="h6"
                color="primary"
                sx={{ mt: 1, fontWeight: "bold" }}
              >
                {car.price_per_day} TND
              </Typography>
              <Typography variant="caption" color="error">
                * Prix des extras non inclus.
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                sx={{ mt: 3 }}
              >
                <TextField
                  fullWidth
                  label="Nom & Prénom"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Téléphone"
                  name="phone"
                  value={form.phone}
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
                  label="Pays & Ville"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  margin="normal"
                />

                <Button
                  variant="outlined"
                  component="label"
                  sx={{ mt: 2, mb: 1 }}
                >
                  Télécharger votre permis de conduire
                  <input
                    type="file"
                    hidden
                    accept="image/*,.pdf"
                    onChange={handleLicenseUpload}
                  />
                </Button>

                {licenseFile && (
                  <Typography variant="body2" color="textSecondary">
                    Fichier sélectionné: {licenseFile.name}
                  </Typography>
                )}

                <FormControlLabel
                  control={<Checkbox />}
                  label="J’ai lu et accepté les conditions générales d’utilisation."
                  sx={{ mt: 2 }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Souhaitez-vous être informé des actualités AIRCAR ?"
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  Réserver maintenant
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Réservation envoyée avec succès !
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Details;
