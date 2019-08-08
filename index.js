const express = require('express');
const joi =require('joi');
var app = express();
app.use(express.json()); //middleware
//module.exports.a=10;
module.exports.note=[{taskName : "Cricket",description :"to play cricket on Monday"}];

//Import Routes
const apiRoute=require('./buisness_logic/api');
app.use('/api/notes',apiRoute);
// ROUTES




app.listen(3000);
console.log('App Listening on port 3000');
