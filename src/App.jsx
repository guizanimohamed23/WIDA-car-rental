// App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Liste from "./pages/Liste";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Details from "./pages/Details";
import Popup from "./pages/popup";
import Admin from "./pages/Admin";
import AdminLoginPage from "./pages/AdminLoginPage";

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3001/cars");
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home cars={cars} />} />
        <Route path="/liste" element={<Liste cars={cars} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/popup" element={<Popup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;