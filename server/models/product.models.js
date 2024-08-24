/** Load mongoose external ODM/ORM module **/
const mongoose = require('mongoose');

/** Load mongoose-unique-validator external plugin from npm for showing custom message for unique constraints **/
const uniqueValidator = require('mongoose-unique-validator');

/** Load config local module **/
const config = require('../config/config');

// create a product schema object by mongoose Schema class ...
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '**Product Name is required'],
        trim: true,
        maxLength: [30, '**Product name can not be exceeded 30 characters'],
        minLength: [3, '**Product name can not be less than 3 characters']
    },
    slug: { // note: in slug we don't need trimming in slug, it automatically done by slug package 
        type: String,
        required: [true, '**Slug is required'],
        lowercase: true, // remember that: slug always be in lowercase
        unique: true
    },
    desc: {
        type: String,
        required: [true, '**Product Description is required'],
        trim: true,
        minLength: [3, '**Product Description atleast 3 characters long']
    },
    price: {
        type: Number,
        required: [true, '**Product Price is required'],
        validate: {
            validator: v => v > 0,
            message: props => `${props?.value} Product Price should be always greater than zero`
        }
    },
    sold: {
        type: Number,
        default: 0,
        validate: {
            validator: v => v >= 0,
            message: props => `${props?.value} Sold quantity should not be negative`
        }
    },
    shipping_charge: {
        type: Number,
        default: 0, // 0 => free charge and others => amt. charge
    },
    qty: {
        type: Number,
        required: [true, '**Product quantity is required'],
        validate: {
            validator: v => v >= 0,
            message: props => `${props?.value} Product quantity should not be negative`
        }
    },
    pro_image: {
        type: String,
        default: `${config.app.baseUrl}/products/product-image-placeholder.png`
    },
    thumbnail_image: {
        type: [String],
        default: [`${config.app.baseUrl}/products/product-image-placeholder.png`]
    },
    brand: {
        type: String,
        required: [true, '**Product brand is required']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, '**Product Category is required'],
        ref: 'Category'
    }
}, { versionKey: false, timestamps: true });

/** Apply the uniqueValidator plugin to userSchema. **/
productSchema.plugin(uniqueValidator, { message: '{PATH} already exists' });

// create category model based on category schema ...
const ProductModel = new mongoose.model('Product', productSchema);

module.exports = ProductModel;
console.log('product model is ready to use ...');
