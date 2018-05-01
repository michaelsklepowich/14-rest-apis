'use strict'

// Application dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');
const bodyparser = require('body-parser');

// Application Setup
const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;


// COMMENT: Explain the following line of code. What is the API_KEY? Where did it come from?
const API_KEY = 'AIzaSyCoXYAtJ8tWx1VDuinGJgoUb0bO5KIPz-A';

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Application Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// API Endpoints

//testing request to google maps API
app.get('/api/v1/map_call/:location', (req, res) => {
  // let formString = req.params.location.split('').join('+');
  let formString = req.params.location;
  console.log('in the route',formString);
  // let url = `https:maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`;
  let url = `http://pokeapi.co/api/v2/pokemon/1`;
  superagent.get(url)
    .then(console.log(res, 'testing'))
    .catch(console.error)
});

app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
