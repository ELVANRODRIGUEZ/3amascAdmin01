// **************************************** IMPORTING PACKAGES.

// This loads "dotenv" package so we can use a .env file to store environmental variables.
// --nmp install dotenv-- is needed to install this package, and we must proceed to create
// the .env file afterwards.
require("dotenv").config();

// **************************************** CREATING CONSTANTS TO STORE FRAMEWORKS,
// **************************************** MODULES, APP OBJECT, ROUTES AND OTHER UTILITIES OR PACKAGES

// This loads Express, which is a web app framework for Node.js for:
// 1) Request handling.
// 2) Response management.
// 3) Request parsing.
// 4) Incoming requests routing.
// 5) RESTful API Development in general.
// The entire Express framework is represented in the 'express' object,
// from which we can access all its functionality.
const express = require("express");

// This create the URL endpoint or router object, which we will configuer to handle
// CRUD operations over it.
const router = express.Router();

// This extracts the Pool property from the 'pg' framework. In this particular
// case, Pool is a class provided by the 'pg' framework, although in the context
// of a constant created with this syntax, '{Pool}' would refer to a property from'
// the required object, in this case, the 'pg' object. Since 'pg' has a property
// whith that name, we frame our constant name with "{}" to indicate the name
// of the property we want to extract, and assign it to a variable or constant
// with the exact same name at the same time.
// 'pg' framework is known as the 'node-postgres' module. It will represent a 
// client for a PostgreSQL database, and will allow us to interact with it.
// Pool is a class from 'pg', and it is used to manage connection to a PostgraSQL
// database through a connection pooling, which is a technique where a pool (group)
// of database connection is created and maintain, allowing multiple client requests
// to share and reuse these connections isntead of creating a new connection for
// each request, improving performance and resource utilizacion.
// At this point, we are importing a class (the 'Pool' class), and storing it
// in the constant also called 'Pool'.
const { Pool } = require('pg');


//  **************************************** CONFIGURING THE POSTGRESQL DATABASE CONNECTIONS

// From the 'Pool' class we imported, now we create the 'pool' instance (object,
// as the "{}" indicate (This is called "object literals", or "configuration object")).
// "connectionString" and "ssl" are configuration options of the
// "Pool" object (named "pool").
// "connectionString" specifies the string that allows us to connect to the 
// database. That string might contain all info required to establish the connection,
// like the password and database name, when in comes in this format:
// "postgres://username:password@hostname:port/database_name"
// Or we could also specify it separately.
// SSL/TLS is commonly used to secure communications between client (Node.js app) and
// PosgreSLQ server.
// The second option is "ssl", which manages the SSL/TLS options for the database
// connection
// "rejectUnauthorized" is also an option that is part of the Configuration Object
// that is being the option for the "ssl" option.
// In this case, we are telling the client to accept connections from unverified
// servers, however, the only server the database will be talking to is Heroku, 
// so there is no risk in that, an "rejectUnauthorized: false" is often needed
// for the Heroku connection to run smoothly.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Heroku provides this automatically
  ssl: {
    rejectUnauthorized: false // Necessary for connecting to Heroku PostgreSQL
  }
});


//  **************************************** SETTING UP THE GET REQUEST

// This configures the endpoint to react to a GET request. It is important to remember that
// there can be many reactions to the same request, as there are in this app in other modules.
// This configures the reaction to a GET request made to the root URL, as indicated in the
// first argument of the '.get' router method. The second arguement indicates what to do, that
// is, how to react to the GET reques. 
// In this case, the reaction is an asyncronous arrow function. By using 'async' keyword,
// we are introducing the possibility of awaiting for some line of code to yield its result
// before moving on. That we indicate with the keword 'await'. The functions pauses right
// there until the execution is done, and then continues its execution.
router.get('/', async (req, res) => {

  // To manage errors properly, everything we do in this function we are going to try it in 
  // order to catch any possible error.
  try {
      console.log('Request received for /api/materiales');
      const client = await pool.connect(); // The function will pause here until we have a connection 
      // result.
      console.log('Connected to the database to SELECT MATERIALES');
      
      const result = await client.query('SELECT * FROM materiales'); // We query the connection object (wich 
      // connects to the database) by using the '.query' method, which passes on the SQL command.
      const materiales = result.rows; // The query result object stores the fetched rows, and they can be
      // called with the '.rows' property.
      
      client.release(); // We release this connection to the pool, which is a good practice to 
      // avoid a low performance due to hevy traffic in the endpoint. For small applications, this
      // might not yield any apparent difference, but in heavy traffic applications it does make
      // a difference. One can see that if manually triggers several requests one after another.
      // They will start to slow down the response, or won't get any response at all.

      console.log('Released database connection to SELECT MATERIALES');
      
      res.json(materiales);// Sending the response in JSON format
      console.log('Sent "materiales" data as JSON');
      
      // console.log(materiales); // Verification Log.

    } catch (err) {

      // We log the error and send a status to the client.
      console.error('Error fetching unidades: ', err);
      res.status(500).json({ error: 'Internal server error' });

    }
})


//  **************************************** EXPORTING THE ROUTER

// In Node.js, 'module' is a global object that represents the curren module (.js file).
// 'module.exports' is a property that is by default empty ({}). That property can have a
// single value (object), so we assign the desired value, in this case, 'router' object
// to 'module.exports' so that whenever we require this module, 'router' object will be
// the exportation. 
module.exports = router;