import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Popup() {
  const [openUser, setOpenUser] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f0f2f5",
      }}
    >
      <Stack spacing={4} alignItems="center">
        <Typography variant="h4">Welcome to Wida Car Rental Shop</Typography>
        <Stack direction="row" spacing={4}>
          <Button variant="contained" color="primary" onClick={() => setOpenUser(true)}>
            Sign in as User
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setOpenAdmin(true)}>
            Sign in as Admin
          </Button>
        </Stack>
      </Stack>

      <Dialog open={openUser} onClose={() => setOpenUser(false)}>
        <DialogTitle>User Login</DialogTitle>
        <DialogContent>
          <DialogContentText>Continue to user login page?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUser(false)}>Cancel</Button>
          <Button onClick={() => navigate("/signin")} color="primary">Continue</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAdmin} onClose={() => setOpenAdmin(false)}>
        <DialogTitle>Admin Login</DialogTitle>
        <DialogContent>
          <DialogContentText>Continue to admin login page?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdmin(false)}>Cancel</Button>
          <Button onClick={() => navigate("/SignIn ")} color="secondary">Continue</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}