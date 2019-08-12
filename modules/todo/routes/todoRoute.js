const todoController =  require("../controllers/todoController");
const todoValidator  =  require("../validators/todoValidators");
const express = require("express");
//require('express-async-await')
//const pg=require('pg');
const router = express.Router();

router.get('/',todoController.get);
router.post('/',todoController.post);
router.get('/:id',todoController.readSpecific);
router.put('/:id',todoController.update);
router.delete('/:id',todoController.delete);
module.exports=router;
