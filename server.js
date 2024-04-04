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

// This imports the Node.js Path module, which provides utilities for working
// file and directory paths.
const path = require("path");

// Different from the 'express' object, 'express()' creates an instance of an
// Express Application, which represents our actual Express server.
// This is the specific object for which we define routes, middleware
// and other configuration.
const app = express();

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

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Defining the host name and port and storing them as constants.
// We give two options: either a set value for both of them, or 
// a value stored as environmental variables that the server will
// assign by looking for "HEROKU_HOSTNAME" and "PORT" environmental
// variables.
const hostname = process.env.HEROKU_HOSTNAME || '127.0.0.1';
const port = process.env.PORT || 3300;

// These objects import the corresponding files located in '/routes' folder. 
// Whatever functionality was coded in those files, is get imported and
// assigned to these objects, from which we can take advantage of it.
const obrasRouter = require('./routes/apiObras');
const unidadesRouter = require('./routes/apiUnidades');
const materialesRouter = require('./routes/apiMateriales');

// **************************************** SETTING UP ROUTES.

// This tells our app to allow the server using static files located in the
// 'client/public' folder directory. They will be used as they are.
// The 'use' method mounts middleware to a specified location in our
// app folder structure.
// 'express.static() is a built-in middleware function for serving
// static files (like HTML and Javascript files). They are static
// because they don't require server processing.
// 'path.join() build an absolute path for those files by joining
// whatever path chunks we indicate as arguments.
// In this case, it joins the current module's directory name by using
// '__dirname', and the route 'client/public' afterwards.
app.use(express.static(path.join(__dirname, 'client/public')));

// These lines set up a route for handling API requests.
// Each route gets its name in the first argument, and 
// specifies a middleware that will manage those requests, 
// in the second argument.
// We are expressing that our 'app' will have those routes.
app.use('/api/obras',obrasRouter);
app.use('/api/unidades',unidadesRouter);
app.use('/api/materiales',materialesRouter);


// **************************************** DEFINING A ROUTE FOR THE LANDING PAGE ("index.html").

// '.get' manages the HTTP GET request made to a route in our app, 
// in this case, the '/' route, meaning, the URL of our app.
// '(req,res) => {}' is an arrow function that defines the procedure to follow
// at the GET request; it has two objects, the request object (req) and the
// response object ('res'). We are not using the 'req' object here, but need
// to write it so the function can distinguis between the two object parameters.
// 'res.sendFile(path)' sends the static file 'index.html' located in the
// specified path. We are able to send that file only because we let our app
// to serve static files from that directory on a previous code line.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

// **************************************** PORT LISTENING.

// Heroku dynamically assigns a port to our application and sets the PORT environment variable. 
// We then must use "process.env.PORT" directly to listen on the correct port provided by Heroku. 
// By removing "hostname" argument (leaving just "port") from the server.listen method, our server will listen on all available network interfaces, 
// which is what Heroku expects.
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
