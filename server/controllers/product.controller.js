/** Load slugify external module **/
const slugify = require('slugify');

/** Load http-errors external module **/
const createError = require('http-errors');

/** Load response utility custom module **/
const { successResponseHandler } = require('../helpers/responseHandler');

/** Load product related services **/
const { createProduct, ListAllProducts, fetchParticularProduct, searchedProductsByKeywords, editProduct, removeProduct } = require('../services/product.services');

/** Load config local module **/
const config = require('../config/config');

exports.addNewProduct = async (req, res, next) => {
    try {
        const pro_data = {};
        for (let key in req.body) {
            if (['name', 'desc', 'price', 'sold', 'shipping_charge', 'qty', 'pro_image', 'thumbnail_image', 'brand', 'category'].includes(key)) {
                pro_data[key] = req.body[key];
            }
        }
        pro_data.slug = slugify(pro_data?.name);
        if (req.files) {
            if (req.files.pro_image) {
                pro_data.pro_image = `${config.app.baseUrl}/products/${req.files.pro_image[0].filename}`;
            }
            if (req.files.thumbnail_image) {
                pro_data.thumbnail_image = req.files.thumbnail_image.map(file => `${config.app.baseUrl}/products/${file.filename}`);
            }
        }
        const { status, message, data } = await createProduct(pro_data, req.body.category);
        successResponseHandler(res, {
            status,
            message,
            payload: data
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllProducts = async (req, res, next) => {
    try {
        const page = +(req.query.page) || 1;
        const limit = +(req.query.limit) || 1;
        const { products, count } = await ListAllProducts(page, limit);
        successResponseHandler(res, {
            status: 200,
            message: 'Products fetched successfully',
            payload: {
                products,
                pagination: {
                    totalNoOfProducts: count,
                    page,
                    noOfPages: Math.ceil(count / limit),
                    prevPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getSingleProduct = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const data = await fetchParticularProduct(slug);
        successResponseHandler(res, {
            status: data.status,
            message: data.message,
            payload: data.product
        });
    } catch (error) {
        next(error);
    }
};

exports.searchedProducts = async (req, res, next) => {
    try {
        const { keywords } = req.params;
        const page = +(req.query.page) || 1;
        const limit = +(req.query.limit) || 1;
        const { products, count } = await searchedProductsByKeywords(keywords, page, limit);
        successResponseHandler(res, {
            status: 200,
            message: 'Results of Searched Products',
            payload: {
                products,
                pagination: {
                    totalNoOfProducts: count,
                    page,
                    noOfPages: Math.ceil(count / limit),
                    prevPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProductBySlug = async (req, res, next) => {
    try {
        if (req.method !== 'PUT' && req.method !== "PATCH") {
            throw createError(405, `${req.method} method not allowed for this route !!!`);
        }
        const { slug } = req.params;
        const pro_update_data = {};
        const filter = { slug };
        const options = { new: true };
        for (let key in req.body) {
            if (['name', 'desc', 'price', 'sold', 'shipping_charge', 'qty', 'pro_image', 'thumbnail_image', 'brand', 'category'].includes(key)) {
                pro_update_data[key] = req.body[key];
            }
        }
        if (pro_update_data?.name) {
            pro_update_data.slug = slugify(pro_update_data?.name);
        }
        if (req.files) {
            if (req.files.pro_image) {
                pro_update_data.pro_image = `${config.app.baseUrl}/products/${req.files.pro_image[0].filename}`;
            }
            if (req.files.thumbnail_image) {
                pro_update_data.thumbnail_image = req.files.thumbnail_image.map(file => `${config.app.baseUrl}/products/${file.filename}`);
            }
        }
        const update = {
            $set: pro_update_data
        };
        const { status, message, updatedProduct } = await editProduct(req, filter, update, options);
        successResponseHandler(res, {
            status,
            message,
            payload: updatedProduct
        });
    } catch (error) {
        next(error);
    }
};

exports.delSingleProduct = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { status, message, deletedProduct } = await removeProduct(slug);
        successResponseHandler(res, {
            status,
            message,
            payload: deletedProduct
        });
    } catch (error) {
        next(error);
    }
};