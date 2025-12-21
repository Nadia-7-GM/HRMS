const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3030;

app.get("/", (req, res) => {
    res.send("✅ HRMS API is running");
});

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/departments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM departments');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/countries', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM countries');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/locations', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM locations');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/dependents', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM dependents');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/regions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM regions');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/jobs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM jobs');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/job_history', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM job_history');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
