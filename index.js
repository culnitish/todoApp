const express = require('express');
// for Creating a Server
const app = express();

app.get('/api/posts',(req,res)=>{
    res.send("TO DO APP");
    console.log("IN TO DO APP , Control Flow... ");
});
app.listen(3000);
console.log('App Listening on port 3000');
