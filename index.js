const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) console.error("❌ DB connection error:", err);
  else console.log("✅ Connected to MySQL database");
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ======= AUTH ROUTES =======
app.post("/signup", (req, res) => {
  const { name, email, password, phone } = req.body;
  const sql =
    "INSERT INTO users (name, email, password, phone_number) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, password, phone], (err) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.status(201).json({ message: "User registered successfully!" });
  });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "admin") {
    return res.json({
      role: "admin",
      id: 0,
      email: "admin@gmail.com",
      name: "Admin",
    });
  }

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: "DB error" });
      if (results.length === 0)
        return res.status(401).json({ error: "Invalid credentials" });

      const user = results[0];
      res.json({ role: "user", user });
    }
  );
});

// ======= CAR ROUTES =======
app.get("/cars", (req, res) => {
  db.query("SELECT * FROM cars", (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});

app.get("/cars/:id", (req, res) => {
  db.query("SELECT * FROM cars WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (results.length === 0) return res.status(404).json({ error: "Car not found" });
    res.json(results[0]);
  });
});

app.post("/cars", (req, res) => {
  const { id, brand, model, year, price_per_day, image_url } = req.body;
  const sql =
    "INSERT INTO cars (id, brand, model, year, price_per_day, image_url) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [id, brand, model, year, price_per_day, image_url], (err) => {
    if (err) {
      console.error("❌ Error adding car:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.status(201).json({ message: "Car added successfully" });
  });
});

// ✅ UPDATE car by ID
app.put("/cars/:id", (req, res) => {
  const carId = req.params.id;
  const { brand, model, year, price_per_day, image_url } = req.body;

  const sql =
    "UPDATE cars SET brand = ?, model = ?, year = ?, price_per_day = ?, image_url = ? WHERE id = ?";
  db.query(
    sql,
    [brand, model, year, price_per_day, image_url, carId],
    (err, result) => {
      if (err) {
        console.error("❌ Error updating car:", err);
        return res.status(500).json({ error: "DB error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Car not found" });
      }
      res.json({ message: "Car updated successfully" });
    }
  );
});

app.delete("/cars/:id", (req, res) => {
  const carId = req.params.id;
  db.query("DELETE FROM cars WHERE id = ?", [carId], (err, result) => {
    if (err) {
      console.error("❌ Error deleting car:", err);
      return res.status(500).json({ error: "DB error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json({ message: "Car deleted successfully" });
  });
});

// ======= BOOKING ROUTE =======
app.post("/book", upload.single("license"), async (req, res) => {
  const { name, phone, email, city, message } = req.body;
  const license = req.file;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "guizanimohamed91@gmail.com",
    subject: "🚗 Nouvelle réservation",
    text: `Nom: ${name}\nTéléphone: ${phone}\nEmail: ${email}\nVille: ${city}\nMessage: ${message}`,
    attachments: license
      ? [{ filename: license.originalname, content: license.buffer }]
      : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Réservation envoyée avec succès !" });
  } catch (err) {
    console.error("❌ Booking email error:", err);
    res.status(500).json({ error: "Erreur d’envoi" });
  }
});

// ======= CONTACT ROUTE =======
app.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "guizanimohamed91@gmail.com",
    subject: "📩 Nouveau message de contact",
    text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message envoyé avec succès" });
  } catch (error) {
    console.error("❌ Contact email error:", error);
    res.status(500).json({ error: "Erreur d’envoi" });
  }
});

// ======= START SERVER =======
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
