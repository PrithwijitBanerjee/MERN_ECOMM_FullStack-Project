/** Load category related models **/
const CategoryModel = require('../models/category.models');

/** Load slugify external module **/
const slugify = require('slugify');

exports.createNewCategory = async name => {
    try {
        const categoryDoc = new CategoryModel({
            name,
            slug: slugify(name)
        });
        await categoryDoc.save();
        return categoryDoc;
    } catch (error) {
        throw error;
    }
};

exports.fetchedAllCategories = async () => {
    try {
        const categoryList = await CategoryModel.find({}).select('name slug products').populate("products").lean().exec(); // here lean() is used to convert from category mongoDb document to JS object ...
        if (!categoryList?.length) {
            return {
                message: 'No Category present !!!',
                categoryList: null
            };
        }
        return {
            message: 'Categories were fetched successfully',
            categoryList
        };
    } catch (error) {
        throw error;
    }
};

exports.fetchedSingleCategory = async slug => {
    try {
        const category = await CategoryModel.findOne({ slug }).select('name slug products').populate("products").lean().exec(); // here lean() is used to convert from category mongoDb document to JS object ...
        if (!category) {
            return {
                status: 404,
                message: 'Category does not exists on given id !!!',
                category: null
            };
        }
        return {
            status: 200,
            message: 'Single category was returned successfully',
            category
        };
    } catch (error) {
        throw error;
    }
};

exports.updateCategory = async (name, slug) => {
    try {
        const filter = { slug };
        const options = { new: true };
        const updates = {
            $set: {
                name: name,
                slug: slugify(name)
            }
        };
        const updatedCategory = await CategoryModel.findOneAndUpdate(filter, updates, options);

        if (!updatedCategory) {
            return {
                status: 404,
                message: 'Updation failed, category of given id does not exist !!!',
                updatedCategory
            };
        }
        return {
            status: 200,
            message: 'Category of given id has been updated successfully',
            updatedCategory
        };
    } catch (error) {
        throw error;
    }
};

exports.deleteCategory = async slug => {
    try {
        const deletedCategory = await CategoryModel.findOneAndDelete({ slug });
        if (!deletedCategory) {
            return {
                status: 404,
                message: 'Deletion Failed, Category does not exists on given id !!!',
                deletedCategory: null
            };
        }
        return {
            status: 200,
            message: 'Category was deleted successfully',
            deletedCategory
        };
    } catch (error) {
        throw error;
    }
}