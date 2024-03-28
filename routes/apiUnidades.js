require("dotenv").config();

const express = require("express");
const router = express.Router();

const { Pool } = require('pg');

// Configure the database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Heroku provides this automatically
    ssl: {
      rejectUnauthorized: false // Necessary for connecting to Heroku PostgreSQL
    }
  });

router.get('/', async (req, res) => {
    try {
        console.log('Request received for /api/unidades'); // Log to check if the route is triggered
        const client = await pool.connect();
        console.log('Connected to the database'); // Log to check if the database connection is successful
    
        const result = await client.query('SELECT * FROM unidades');
        const unidades = result.rows;
        
        client.release();
        console.log('Released database connection'); // Log to check if the connection is released
    
        res.json(unidades);
        console.log('Sent unidades data as JSON'); // Log to check if JSON response is sent
    
        console.log(unidades); // Log the fetched data for further verification
      } catch (err) {
        console.error('Error fetching unidades: ', err); // Log any errors that occur
        res.status(500).json({ error: 'Internal server error' });
      }
})


module.exports = router;