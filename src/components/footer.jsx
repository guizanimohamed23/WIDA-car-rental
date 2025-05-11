// Footer.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Footer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ name: "", email: "", phone: "", message: "" });
        setOpen(true);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      setError(true);
    }
  };

  return (
    <Box sx={{ background: "#3C92F2", color: "white", padding: "4rem 0" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: 6,
        }}
      >
        {/* Contact Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            background: "rgba(30, 110, 195, 0.9)",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "5px 5px 15px rgba(0,0,0,0.2)",
            width: { xs: "90%", md: "35%" },
            textAlign: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            GET IN TOUCH
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            sx={{ background: "white", borderRadius: "5px", mt: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            sx={{ background: "white", borderRadius: "5px", mt: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Phone number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            sx={{ background: "white", borderRadius: "5px", mt: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Message"
            name="message"
            multiline
            rows={3}
            value={form.message}
            onChange={handleChange}
            sx={{ background: "white", borderRadius: "5px", mt: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              background: "black",
              color: "white",
              borderRadius: "20px",
              marginTop: 2,
              padding: "10px 0",
              fontSize: "1rem",
              "&:hover": { background: "#222" },
            }}
          >
            SEND MESSAGE
          </Button>
        </Box>

        {/* Contact Info */}
        <Box
          sx={{
            textAlign: "center",
            width: { xs: "90%", md: "60%" },
            fontSize: "1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "3rem",
            minHeight: "350px",
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            Contact
          </Typography>
          <Typography variant="h5" display="flex" alignItems="center">
            <PhoneIcon sx={{ marginRight: 2, fontSize: "2.5rem" }} />
            +216 96 026 045
          </Typography>
          <Typography variant="h5" display="flex" alignItems="center">
            <EmailIcon sx={{ marginRight: 2, fontSize: "2.5rem" }} />
            guizanimohamed91@gmail.com
          </Typography>
          <Typography variant="h5" display="flex" alignItems="center">
            <LocationOnIcon sx={{ marginRight: 2, fontSize: "1.5rem" }} />
            7ay Riadh, Sousse
          </Typography>

          <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
            <InstagramIcon sx={{ fontSize: 50, cursor: "pointer" }} />
            <YouTubeIcon sx={{ fontSize: 50, cursor: "pointer", mx: 2 }} />
            <EmailIcon sx={{ fontSize: 50, cursor: "pointer" }} />
          </Box>
        </Box>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Message envoyé avec succès !
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Une erreur s'est produite lors de l'envoi.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Footer;
