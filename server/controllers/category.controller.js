/** Load response utility custom module **/
const { successResponseHandler } = require('../helpers/responseHandler');

/** Load category related services **/
const { createNewCategory, fetchedAllCategories, fetchedSingleCategory, updateCategory, deleteCategory } = require('../services/category.services');

/** Load http-errors external module **/
const createError = require('http-errors');

exports.addNewCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const categoryItem = await createNewCategory(name);
        successResponseHandler(res, {
            status: 201,
            message: 'Category was added successfully',
            payload: {
                category: categoryItem
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllCategories = async (req, res, next) => {
    try {
        const { message, categoryList } = await fetchedAllCategories();
        successResponseHandler(res, {
            status: 200,
            message,
            payload: {
                categories: categoryList
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getSingleCategory = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { status, message, category } = await fetchedSingleCategory(slug);
        if (!category) {
            throw createError(status, message);
        }
        successResponseHandler(res, {
            status,
            message,
            payload: {
                category
            }
        });
    } catch (error) {
        next(error);
    }
};


exports.updateSingleCategory = async (req, res, next) => {
    try {
        if (req.method !== "PUT" && req.method !== "PATCH") {
            throw createError(405, `${req.method} not allowed to update category !!!`);
        }
        const { slug } = req.params;
        const { name } = req.body;
        const { status, message, updatedCategory } = await updateCategory(name, slug);
        if (!updatedCategory) {
            throw createError(status, message);
        }
        successResponseHandler(res, {
            status,
            message,
            payload: {
                updatedCategory
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteSingleCategory = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { status, message, deletedCategory } = await deleteCategory(slug);
        if (!deleteCategory) {
            throw createError(status, message);
        }
        successResponseHandler(res, {
            status,
            message,
            payload: {
                deletedCategory
            }
        });
    } catch (error) {
        next(error);
    }
};