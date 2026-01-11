require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // tumhara db.js

const app = express();
app.use(cors());
app.use(express.json()); // JSON body parse ke liye

// 🔹 TEST API
app.get("/", (req, res) => {
  res.send("Neon API is working ✅");
});

// 🔹 GET ALL USERS
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("GET /users Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 🔹 GET USER BY ID
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET /users/:id Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 🔹 CREATE NEW USER
app.post("/users", async (req, res) => {
  const { name, phone, location, payment_method, query } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (name, phone, location, payment_method, query) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, phone, location, payment_method, query]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /users Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 🔹 UPDATE USER
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone, location, payment_method, query } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users 
       SET name=$1, phone=$2, location=$3, payment_method=$4, query=$5 
       WHERE id=$6 RETURNING *`,
      [name, phone, location, payment_method, query, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /users/:id Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 🔹 DELETE USER
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully ✅" });
  } catch (err) {
    console.error("DELETE /users/:id Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 🔹 SERVER START
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

// POST address
app.post("/addresses", async (req, res) => {
  const { user_name, phone, location, payment_method, query } = req.body;
  console.log("Incoming request body:", req.body);

  try {
    const result = await pool.query(
      `INSERT INTO addresses (user_name, phone, location, payment_method, query)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_name, phone, location, payment_method, query]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("POST /addresses error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// GET addresses
app.get("/addresses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM addresses ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE address
app.delete("/addresses/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM addresses WHERE id=$1", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// PUT / edit address
app.put("/addresses/:id", async (req, res) => {
  const { user_name, phone, location, payment_method, query } = req.body;
  try {
    const result = await pool.query(
      `UPDATE addresses 
       SET user_name=$1, phone=$2, location=$3, payment_method=$4, query=$5
       WHERE id=$6 RETURNING *`,
      [user_name, phone, location, payment_method, query, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE id=$1", [id]);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone, location, payment_method, query } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users 
       SET name=$1, phone=$2, location=$3, payment_method=$4, query=$5
       WHERE id=$6 RETURNING *`,
      [name, phone, location, payment_method, query, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});
