/** Load user related model **/
const UserModel = require('../models/users.models');

/** Load http-errors module **/
const createError = require('http-errors');

/** Load mongoose ORM **/
const mongoose = require('mongoose');

const validateItemId = (req, res, next) => {
    const _uId = req.params.id;
    const user = UserModel.findById(_uId);
    user.then(usrData => {
        if (!usrData) {
            return next(createError(404, `Updation failed, ${UserModel?.modelName} of given id does not exist !!!`));
        }
        next();
    }).catch(error => {
        if (error instanceof mongoose.Error.CastError) {
            return next(createError(400, `Updation failed, Invalid ${UserModel?.modelName} Id !!!`));
        }
        return next(createError(400, error));
    });
};

module.exports = validateItemId;