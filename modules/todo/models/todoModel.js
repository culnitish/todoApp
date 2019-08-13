const dbConnections = require("../../../lib/dbConnection");

class TodoModel {

    //To fetch all the Notes pagination considered
    async fetches(searchString,isCompleted,orderByCreatedAt,pageSize,pageNumber) {
        return new Promise(async (resolve, reject) => {
            console.log(searchString,isCompleted,orderByCreatedAt,pageSize,pageNumber);
            //pageSize=parseInt(pageSize);
            //pageNumber=parseInt(pageNumber);
            console.log(typeof(searchString),typeof(isCompleted),typeof(pageNumber),typeof(pageSize)); 
            if(orderByCreatedAt===1){
                dbConnections.query('Select * from notes where taskName like $1 or description like $1  and isCompleted =($2) order by updatedAt LIMIT ($3) OFFSET (($4) - 1) * ($3) ',
            ['%'+searchString+'%',isCompleted,pageSize,pageNumber]
            , function (err, result) {
                if (err) {
                    return reject(err);
                }
                return resolve(result.rows);
            });
            }else{
                dbConnections.query('Select * from notes where taskName like $1 or description like $1  and isCompleted =($2) order by updatedAt desc LIMIT ($3) OFFSET (($4) - 1) * ($3) ',
                ['%'+searchString+'%',isCompleted,pageSize,pageNumber]
                , function (err, result) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result.rows);
                });
            }
            
        })
    };
  
    // To fetch a specific Note
    async notes_Specific(id) {
        return new Promise(async (resolve, reject) => {
            let notesCount = await this.count_notes(id);
            if (parseInt(notesCount[0].count) === 1) {
                dbConnections.query('SELECT * FROM notes where id=($1)', [id], function (err, result) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result.rows);
                });
            }
            else
                return reject(`Not found id= ${id} to Fetch`);

           
        })
    }

    // To Update a Note
    async notes_Update(id, taskName, description, isCompleted) {
        return new Promise(async (resolve, reject) => {
            let notesCount = await this.count_notes(id);
            //console.log("== NOTEST COUNT ==", notesCount);
            if (parseInt(notesCount[0].count) === 1) {
                var today = await this.today_Date();
                console.log(id, taskName, description, isCompleted);
                dbConnections.query('UPDATE  notes SET taskName=($1),description=($2),isCompleted=($3),updatedAt =($4) where id=($5)', [taskName, description, isCompleted, today, id], function (err, result) {
                    if (err) {
                        return reject(err);
                    }
                    console.log("== INSIDE FUNCTION ==");
                    //console.log(result.rows);
                    return resolve('1');
                });

            } else {
                return reject(`Not found id= ${id} for update.`);
            }

        })
    }

    // To delete a Note
    async notes_Delete(id) {
        return new Promise(async (resolve, reject) => {
            let notesCount = await this.count_notes(id);
            //console.log("== NOTEST COUNT ==", notesCount)
            if (parseInt(notesCount[0].count) === 1) {
                dbConnections.query('DELETE  FROM notes where id=($1) RETURNING id', [id], function (err, result) {
                    if (err) {
                        return reject(err);
                    }
                    //console.log("== INSIDE FUNCTION ==");
                    return resolve(`Note With id=${id} is Deleted. `);
                });
            } else {
                return reject(`Not Found a note with id=${id} to delete`);
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

        var today = await this.today_Date();
        return new Promise(async (resolve, reject) => {
            dbConnections.query('insert into notes (taskName, description, isCompleted, createdAt, updatedAt) values($1 ,$2 , $3 ,$4 ,$5) RETURNING id', [taskName, description, false, today, today], function (err, result) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                //console.log(`User added with ID: ${result.rows[0].id}`);
                return resolve(`User added with ID: ${result.rows[0].id}`);
            });
        })
    }

    async today_Date() {
        return new Promise((resolve, reject) => {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            resolve(today);
        });

    }

    async noOfDocuments() {
        return new Promise(async (resolve, reject) => {
            dbConnections.query('select count(*) from notes', function (err, result) {
                if (err) {
                    //console.log(err);
                    reject(err);
                }
                // console.log(result.rows);
                resolve(result.rows);

            });
        });

    }
}
module.exports = new TodoModel();