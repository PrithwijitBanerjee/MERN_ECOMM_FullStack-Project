/** Load User related models **/
// const UserModel = require("../models/users.models");

/** Load hhtp-erros external packages **/
const createError = require("http-errors");

/** Load mongoose ODM **/
const mongoose = require("mongoose");

const findItemById = async (Model, id, options = {}) => {
    try {
        const item = await Model.findById(id).select(options);
        if (item) {
            return item;
        } else {
            throw createError(404, `No ${Model.modelName} exist on given id !!!`);
        }
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            throw createError(400, `Invalid ${Model.modelName} Id !!!`);
        }
        throw error;
    }
};


module.exports = findItemById;
console.log('find user by id services is loading ...');