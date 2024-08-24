/** Load user related model **/
const UserModel = require('../models/users.models');

/** Load http-errors external module for handling http related errors **/
const createError = require('http-errors')

/** Load dummy users data **/
const { users } = require('../data');

exports.seedUsers = async (req, res, next) => {
    try {
        // delete all existing user from db ...
        await UserModel.deleteMany({});

        // store dummy users data ...
        const data = await UserModel.insertMany(users);
        if (data?.length) {
            res.status(201).json({
                success: true,
                message: 'Users has been added successfully'
            });
        } else {
            createError(404, 'No Users Present !!!');
        }
    } catch (error) {
        next(error);
    }
};

