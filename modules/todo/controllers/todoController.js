const todoModel = require("../models/todoModel");

class TodoController {

    async get(req, res, next) {
        try {
            let ans = await todoModel.fetches();
            res.status(200).send(ans);
        } catch (err) {
            res.status(400).send(err)
        }
    };
    
};

module.exports = new TodoController();