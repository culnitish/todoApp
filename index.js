const express = require('express');
const joi =require('joi');
var app = express();
app.use(express.json()); //middleware


//Import Routes
const apiRoute=require('./buisness_logic/api');
app.use('/api/notes',apiRoute);
// ROUTES


app.listen(3000);
console.log('App Listening on port 3000');

