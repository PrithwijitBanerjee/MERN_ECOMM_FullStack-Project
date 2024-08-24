/** Load products related model **/
const ProductModel = require('../models/product.models');

/** Load http-errors external module for handling http related errors **/
const createError = require('http-errors')

/** Load dummy products data **/
const { products } = require('../data');

exports.seedProducts = async (req, res, next) => {
    try {
        // delete all existing user from db ...
        await ProductModel.deleteMany({});

        // store dummy users data ...
        const data = await ProductModel.insertMany(products);
        if (data?.length) {
            res.status(201).json({
                success: true,
                message: 'Products has been added successfully'
            });
        } else {
            throw createError(404, 'No Products Present !!!');
        }
    } catch (error) {
        next(error);
    }
};

