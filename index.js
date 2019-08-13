const express = require('express');
const joi =require('joi');
var app = express();
app.use(express.json()); //middleware



//Import Routes
const apiRoute=require('./modules/todo/routes/todoRoute');
app.use('/api/notes',apiRoute);
// ROUTES


//PORT{export PORT=5000} by host dynamically
const PORT =process.env.PORT||3000;
app.listen(PORT,()=> console.log(`Listening On port ${PORT}...`));


