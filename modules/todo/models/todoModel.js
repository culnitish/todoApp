const dbConnections = require("../../../lib/dbConnection");

class TodoModel {

    //To fetch all the Notes
    async fetches() {
        return new Promise(async (resolve, reject) => {
            await dbConnections.query('SELECT * FROM notes where id < 10', function (err, result) {
                if (err) {
                    return reject(err);
                }
                return resolve(result.rows);
            });
        })
    };
    // To fetch a specific Note
    async notes_Specific(id) {
        return new Promise(async (resolve, reject) => {
            await dbConnections.query('SELECT * FROM notes where id=($1)', [id], function (err, result) {
                if (err) {
                    return reject(err);
                }
                return resolve(result.rows);
            });
        })
    }
    
    // To Update a Note
    async notes_Update(id,taskName,description,isCompleted){
     return new Promise(async(resolve, reject) => {
         let notesCount= await this.count_notes(id);
         console.log("== NOTEST COUNT ==", notesCount);
         if(parseInt(notesCount[0].count)===1){
                var today =await this.today_Date();
                console.log(id,taskName,description,isCompleted);
                dbConnections.query('UPDATE  notes SET taskName=($1),description=($2),isCompleted=($3),updatedAt =($4) where id=($5)',[taskName,description,isCompleted,today,id], function (err, result) {
                    if (err) {
                        return reject(err);
                    }
                    console.log("== INSIDE FUNCTION ==");
                    //console.log(result.rows);
                    return resolve('1');
            });  

        }else{
           return  resolve(`Not found id= ${id} for update.`);
         }   
          
      })
    } 
    
    // To delete a Note
    async notes_Delete(id) {
        return new Promise(async (resolve, reject) => {
              let notesCount = await this.count_notes(id);
            console.log("== NOTEST COUNT ==", notesCount)
            if(parseInt(notesCount[0].count)===1){
                dbConnections.query('DELETE  FROM notes where id=($1) RETURNING id', [id], function (err, result) {
                    if (err) {
                        return reject(err);
                    }
                    console.log("== INSIDE FUNCTION ==");
                    return resolve(`Note With id=${id} is Deleted. `);
                });
            }
            else
            {
                return resolve(`Not Found a note with id=${id}`);
            }
            
        })
    }

    async count_notes(id) {
        return new Promise((resolve, reject) => {
            dbConnections.query('SELECT count(id) FROM notes where id=($1)', [id], function (er, res) {
                resolve(res.rows);
            });
        })
    }
    // TO post a Note
    async notes_Post(taskName, description) {
       
        var today =await this.today_Date();
        return new Promise(async (resolve, reject) => {
            await dbConnections.query('insert into notes (taskName, description, isCompleted, createdAt, updatedAt) values($1 ,$2 , $3 ,$4 ,$5) RETURNING id', [taskName, description, false, today, today], function (err, result) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                console.log(`User added with ID: ${result.rows[0].id}`);
                return resolve(`User added with ID: ${result.rows[0].id}`);
            });
        })
    }

    async today_Date(){
        return new Promise((resolve,reject)=>{
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            resolve(today);
            });
        
    }
}
module.exports = new TodoModel();