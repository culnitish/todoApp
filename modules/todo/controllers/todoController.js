const todoModel = require("../models/todoModel");

class TodoController {

    async get(req, res, next) {
        try {
            //console.log(req.body.searchString,req.body.isCompleted,req.body.orderByCreatedAt,req.body.pageSize,req.body.pageNumber);
            let ans = await todoModel.fetches(req.body.searchString,req.body.isCompleted,req.body.orderByCreatedAt,req.body.pageSize,req.body.pageNumber);
            res.status(200).send(ans);
        } catch (err) {
            res.status(400).send(err);
        }
    };
    /*
    async readPages(req,res,next){
        try{
            let ans= await todoModel.readSpecificPages(req.params.id);
            res.status(200).send(ans);
        }catch(err){
            res.status(400).send(err);
        }
    }
*/
   async readSpecific(req,res,next){
    try {
        let ans = await todoModel.notes_Specific(req.params.id);
        res.status(200).send(ans);
    } catch (err) {
        res.status(400).send(err);
    }
   };

   async post(req,res,next){
       try{
           let ans= await todoModel.notes_Post(req.body.taskName,req.body.description);
           res.status(200).send(ans);
       }catch(err){
            res.status(400).send(err);
       }
   }; 

   async update(req,res,next){
       try{
        let ans = await todoModel.notes_Update(req.params.id,req.body.taskName,req.body.description,req.body.isCompleted);
        console.log(ans);
        if(parseInt(ans)===1)
        {
            let answer=await todoModel.notes_Specific(req.params.id);
            res.status(200).send(answer);
        }
        else
        res.status(400).send(ans);
       }catch(err){
        res.status(400).send(err);
       }
   };

   async delete(req,res,next){
    try{
     let ans = await todoModel.notes_Delete(req.params.id);
     res.status(200).send(ans);
    }catch(err){
     res.status(400).send(err);
    }
}

    
};

module.exports = new TodoController();