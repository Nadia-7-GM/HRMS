// console.log("✅ Node.js environment is working!");
const express = require('express');
const cors = require('cors');
const pool = require('./db').default;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});
//  get data from employee table
app.get('/employees', async (req, res) => {
    try {
        const result = await pool.query('Select * from employees');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ err: error.message })
    }
});
//  get data from department table
app.get('/departments', async (req, res) => {
    try {
        const result = await pool.query('Select * from departments');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ err: error.message })
    }
});

//  get data from countries table
app.get('/countries', async (req, res) => {
    try {
        const result = await pool.query('Select * from countries');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ err: error.message })
    }
});
//  get data from locations table
app.get('/locations', async (req, res) => {
    try {
        const result = await pool.query('Select * from locations');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ err: error.message })
    }
});
//  get data from dependants table
app.get('/dependants', async (req, res) => {
    try {
        const result = await pool.query('Select * from dependents');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ err: error.message })
    }
});
//  get data from regions table
app.get('/regions', async (req, res) => {
    try {
        const result = await pool.query('Select * from regions');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ err: error.message })
    }
});
//  get data from jobs table  
app.get('/jobs', async (req, res) => {
    try {
        const result = await pool.query('Select * from jobs');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ err: error.message })
    }
});
//  get data from job_history table
app.get('/job_history', async (req, res) => {
    try { 
        const result = await pool.query('Select * from job_history');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ err: error.message })
    }
});