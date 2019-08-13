const todoController =  require("../controllers/todoController");
const todoValidator  =  require("../validators/todoValidators");
const express = require("express");
const router = express.Router();

router.get('/',todoValidator.checkPages,todoController.get);
router.post('/',todoValidator.checkString,todoController.post);
router.get('/:id',todoController.readSpecific);
router.put('/:id',todoController.update);
router.delete('/:id',todoController.delete);
module.exports=router;
