const express= require('express');

const router = express.Router();

//import {notes} from '../index.js'
let notes=require('../index');
//console.log(num.a);
//let notes= require('../index.js');
//let notes=[{taskName : "Cricket",description :"to play cricket on Monday"}];
router.get('/', function (req, res) {
    console.log("req.body", req.body);
    console.log("req.params",req.params);
    res.status(200).json({
        success:true,
        notes:notes.note
    })
})

router.post('/',(req,res)=>{
    console.log("req.body.taskname: ", req.body.taskName);
    console.log("req.body.Description",req.body.description);
    const obj={
        taskName:req.body.taskName,
        description:req.body.description
    };
    notes.note.push(obj);
    res.status(200).json({
        success:true,
        notes:notes.note
    });
    console.log(notes.note);

})
module.exports=router;