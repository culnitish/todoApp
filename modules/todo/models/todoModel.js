const dbConnections = require("../../../lib/dbConnection");

class TodoModel {

    async fetches() {
        return new Promise(async(resolve, reject) => {
            dbConnections.query('SELECT * FROM notes where id < 10', function (err, result) {
                //dbConnections.done();
                if (err) {
                    return reject(err)
                }
                return resolve(result.rows);
            });
        })
    };
}
module.exports = new TodoModel();