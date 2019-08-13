const todoModel = require('../models/todoModel');
const Joi = require('joi');

class TodoValidator {
    async checkPages(req, res, next) {
        let ans = await todoModel.noOfDocuments();
        console.log(ans[0].count);
        ans = parseInt(ans[0].count) / 10;
        ans = parseInt(ans);
        if (req.params.id <= ans) {
            next();
        } else {
            res.status(400).send(`Page number out of bound . Max Count of pages is:${ans}`);
        }
    };

    async checkString(req, res, next) {
        const schema = Joi.object().keys({
            taskName: Joi.string().min(5).required(),
            description: Joi.string().min(10).required() //error here
        });
        schema.validate({
            taskName: req.body.taskName,
            description: req.body.description
        }, (err, result) => {
            if (err) {
                res.status(400).send(err.details[0].message);

            } else
                next();

        });

    };





};

module.exports = new TodoValidator();