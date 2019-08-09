const todoController =  require("../controllers/todoController");
const todoValidator  =  require("../validators/todoValidators");

//require('express-async-await')
//const pg=require('pg');
const router = express.Router();

router.get('/',todoController.get);
router.post('/',todoController.get);

module.exports=router;
