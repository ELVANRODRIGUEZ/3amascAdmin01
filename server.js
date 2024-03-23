// This loads "dotenv" package so we can use a .env file to store environmental variables.
// --nmp install dotenv-- is needed to install this package, and we must proceed to create
// the .env file afterwards.
require("dotenv").config();

// This loads Express, which is a web app framework for Node.js for:
// 1) Request handling.
// 2) Response management.
// 3) Request parsing.
// 4) Incoming requests routing.
// 5) RESTful API Development in general.

const express = require("express");
const path = require("path");
const app = express();
const { Pool } = require('pg');

// Configure the database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Heroku provides this automatically
  ssl: {
    rejectUnauthorized: false // Necessary for connecting to Heroku PostgreSQL
  }
});

// Test the connection
// pool.query('SELECT * FROM obras', (err, result) => {
//   if (err) {
//     console.error('Error fetching data:', err);
//   } else {
//     console.log('Data fetched successfully:', result.rows);
//   }
//   pool.end(); // Close the connection pool
// });

// Create an API Endpoint on the server side so we can find the fetched data
// by making a HTTP Get Request from the client side.
app.get('/api/obras', async (req, res) => {
  try {
    console.log('Request received for /api/obras'); // Log to check if the route is triggered
    const client = await pool.connect();
    console.log('Connected to the database'); // Log to check if the database connection is successful

    const result = await client.query('SELECT * FROM obras');
    const obras = result.rows;
    
    client.release();
    console.log('Released database connection'); // Log to check if the connection is released

    res.json(obras);
    console.log('Sent obras data as JSON'); // Log to check if JSON response is sent

    console.log(obras); // Log the fetched data for further verification
  } catch (err) {
    console.error('Error fetching obras: ', err); // Log any errors that occur
    res.status(500).json({ error: 'Internal server error' });
  }
});

// app.use(express.static('public'));
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));
// }
app.use(express.static(path.join(__dirname, 'client/public')));
// Define a route for the landing page (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

// const { createServer } = require('node:http');
// const fs = require('fs')

// const hostname = '127.0.0.1';
const hostname = process.env.HEROKU_HOSTNAME || '127.0.0.1';
const port = process.env.PORT || 3300;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   fs.readFile('client/public/index.html',(error,data) => {
//     if (error) {
//         res.writeHead(404)
//         res.write('Error: File not Found')
//     } else {
//         res.write(data)
//     }
//     res.end()
//   })
// });



// Heroku dynamically assigns a port to your application and sets the PORT environment variable. 
// We then must use "process.env.PORT" directly to listen on the correct port provided by Heroku. 
// By removing hostname from the server.listen method, our server will listen on all available network interfaces, 
// which is what Heroku expects.
// server.listen(port, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
