const express= require('express');
const pg=require('pg');
const router = express.Router();

const config = {
    user: 'postgres',
    database: 'test',
    password: 'root',
    port: 5432
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

router.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query('SELECT * FROM notes where id <10', function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
       })
   })
});

// for adding a new note
/*
router.post('/', (req, res, next) => {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        client.query('insert into notes (taskName, description, isCompleted, createdAt, updatedAt) values($1 ,$2 , $3 ,$4 ,$5)', [req.body.taskName,req.body.description,false,today,today],function (err, result) {
             done();
             if (err) {
                 console.log(err);
                 res.status(400).send(err);
             }
             res.status(200).send(result.rows);
        })
    })
 });
 */
/*
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
*/
module.exports=router;