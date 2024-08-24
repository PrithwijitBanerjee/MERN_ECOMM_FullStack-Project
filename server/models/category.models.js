/** Load mongoose external ODM/ORM module **/
const mongoose = require('mongoose');

/** Load mongoose-unique-validator external plugin from npm for showing custom message for unique constraints **/
const uniqueValidator = require('mongoose-unique-validator');

// create a category schema object by mongoose Schema class ...
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '**Category Name is required'],
        trim: true,
        unique: true,
        maxLength: [30, '**Category name can not be exceeded 30 characters'],
        minLength: [3, '**Category name can not be less than 3 characters']
    },
    slug: { // note: in slug we don't need trimming in slug, it automatically done by slug package 
        type: String,
        required: [true, '**Slug is required'],
        lowercase: true, // remember that: slug always be in lowercase
        unique: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
}, { versionKey: false, timestamps: true });

/** Apply the uniqueValidator plugin to userSchema. **/
categorySchema.plugin(uniqueValidator, { message: '{PATH} already exists' });

// create category model based on category schema ...
const CategoryModel = new mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
console.log('category model is ready to use ...');
