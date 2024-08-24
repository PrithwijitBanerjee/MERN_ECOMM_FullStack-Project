/** Load products related model **/
const ProductModel = require('../models/product.models');

/** Load category related model **/
const CategoryModel = require('../models/category.models');

/** Load path core module **/
const path = require('node:path');

/** Load fs core module **/
const fs = require('node:fs');

/** Load http-errors external module **/
const createError = require('http-errors');

exports.createProduct = async (product_data, categoryId) => {
    try {
        const productDoc = new ProductModel(product_data);
        const data = await productDoc.save();
        await CategoryModel.updateOne({ _id: categoryId }, { $push: { products: data?._id } });
        return {
            status: 201,
            message: 'Product was added successfully',
            data
        };
    } catch (error) {
        throw error;
    }
};

exports.ListAllProducts = async (page, limit) => {
    try {
        const products = await ProductModel.find({}).skip((page - 1) * limit).limit(limit).populate("category").lean().exec();
        const count = await ProductModel.countDocuments();
        if (!products.length) {
            throw createError(404, 'No Products found !!!');
        }
        return { products, count };
    } catch (error) {
        throw error;
    }
};

exports.fetchParticularProduct = async slug => {
    try {
        const product = await ProductModel.findOne({ slug }).populate("category").lean().exec();
        if (!product) {
            throw createError(404, 'Product of given id does not exist !!!');
        }
        return {
            status: 200,
            message: 'Product of given id fetch successfully',
            product
        };
    } catch (error) {
        throw error;
    }
};

exports.searchedProductsByKeywords = async (keywords, page, limit) => {
    try {
        const regexExp = new RegExp('.*' + keywords.toLowerCase() + '.*', 'i');
        const products = await ProductModel.find({ slug: regexExp }).skip((page - 1) * limit).limit(limit).populate("category").lean().exec();
        const count = await ProductModel.find({ slug: regexExp }).countDocuments();
        if (!products.length) {
            throw createError(404, 'No Products found !!!');
        }
        return { products, count };
    } catch (error) {
        throw error;
    }
};

exports.editProduct = async (req, filter, update, options) => {
    try {
        const product = await ProductModel.findOne(filter);

        if (!product) {
            if (req.files) {
                Object.values(req.files).forEach(fileArray => {
                    fileArray.forEach(file => {
                        fs.unlink(path.join(__dirname, '/../public/images/products/', file.filename), err => {
                            if (err) {
                                console.error('Failed to delete file:', file.filename, err);
                            }
                        });
                    });
                });
            }
            throw createError(404, 'Updation failed, product of given id does not exists !!!');
        }
        if (path.basename(product?.pro_image) !== "product-image-placeholder.png" && req.files?.pro_image) {
            fs.unlinkSync(__dirname + `/../public/images/products/${path.basename(product?.pro_image)}`);
        }
        if (path.basename(product?.thumbnail_image[0]) !== "product-image-placeholder.png" && req.files?.thumbnail_image) {
            product?.thumbnail_image.forEach(image => fs.unlinkSync(__dirname + `/../public/images/products/${path.basename(image)}`));
        }
        const updatedProduct = await ProductModel.findOneAndUpdate(filter, update, options);
        return {
            status: 200,
            message: 'Product of given id has been updated successfully',
            updatedProduct
        };
    } catch (error) {
        throw error;
    }
};

exports.removeProduct = async slug => {
    try {
        const product = await ProductModel.findOne({ slug });
        if (!product) {
            throw createError('404', 'Deletion failed, product of given id does not exist !!!');
        }
        if (path.basename(product?.pro_image) !== "product-image-placeholder.png") {
            fs.unlinkSync(__dirname + `/../public/images/products/${path.basename(product?.pro_image)}`);
        }
        if (path.basename(product?.thumbnail_image[0]) !== "product-image-placeholder.png") {
            product?.thumbnail_image.forEach(image => fs.unlinkSync(__dirname + `/../public/images/products/${path.basename(image)}`));
        }
        await CategoryModel.updateOne({ _id: product.category }, { $pull: { products: product._id } }); // clear product id from category collection where it exists just like on delete cascade on mysql
        await ProductModel.deleteOne({ slug }); // remove product of given slug from product collection
        return {
            status: 200,
            message: 'Product of given id has been deleted successfully',
            deletedProduct: product
        };
    } catch (error) {
        throw error;
    }
}