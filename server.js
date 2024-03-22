// This loads "dotenv" package so we can use a .env file to store environmental variables.
// --nmp install dotenv-- is needed to install this package, and we must proceed to create
// the .env file afterwards.
require("dotenv").config();

const {Pool} = require('pg');

const pool = new Pool ({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query('SELECT * FROM obras', (err, result) => {

  if (err) {
    console.log('Error fetching data', err);
  } else {
    console.log(result.rows);
  }
  pool.end();
})

const { createServer } = require('node:http');
const fs = require('fs')

// const hostname = '127.0.0.1';
const hostname = process.env.HEROKU_HOSTNAME || '127.0.0.1';
const port = process.env.PORT || 3300;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('client/public/index.html',(error,data) => {
    if (error) {
        res.writeHead(404)
        res.write('Error: File not Found')
    } else {
        res.write(data)
    }
    res.end()
  })
});

// Heroku dynamically assigns a port to your application and sets the PORT environment variable. 
// We then must use "process.env.PORT" directly to listen on the correct port provided by Heroku. 
// By removing hostname from the server.listen method, our server will listen on all available network interfaces, 
// which is what Heroku expects.
server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
