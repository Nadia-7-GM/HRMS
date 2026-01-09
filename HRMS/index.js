require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Test API
app.get("/", (req, res) => {
  res.send("Neon API working ✅");
});

// ✅ GET USERS
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("GET /users error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ POST USER (Android submit ke liye)
app.post("/users", async (req, res) => {
  console.log("Incoming request body:", req.body); // 🔹 Console me dekho

  const { name, phone, location, paymentMethod, query } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (name, phone, location, payment_method, query_text)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, phone, location, paymentMethod, query]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /users error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
