// console.log("✅ Node.js environment is working!");
const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app= express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3030;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);

});
//  get data from employee table
app.get('/employees',async(req,res)=>{
    try{
        const result =await pool.query('Select * from employees');
        res.json(result.rows);
    }
    catch(error){
        res.status(500).json({err:error.message})
    }
});
