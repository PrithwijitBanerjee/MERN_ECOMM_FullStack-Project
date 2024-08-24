/** Load category related model **/
const CategoryModel = require('../models/category.models');

/** Load http-errors external module for handling http related errors **/
const createError = require('http-errors')

/** Load dummy products data **/
const { categories } = require('../data');

exports.seedCategories = async (req, res, next) => {
    try {
        // delete all existing user from db ...
        await CategoryModel.deleteMany({});

        // store dummy users data ...
        const data = await CategoryModel.insertMany(categories);
        if (data?.length) {
            res.status(201).json({
                success: true,
                message: 'Categories has been added successfully'
            });
        } else {
            throw createError(404, 'No Categories Present !!!');
        }
    } catch (error) {
        next(error);
    }
};

