/** Load mongoose external ODM/ORM module **/
const mongoose = require('mongoose');

// create a item schema object by mongoose Schema class ...
const itemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: [true, '**Item Quantity is required for order'],
        min: [1, 'Item Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: [true, 'Item price is required']
    },
    total: {
        type: Number,
        required: [true, 'Item total price is required']
    }
}, { versionKey: false, timestamps: true });

// create a item schema object by mongoose Schema class ...
const cartSchema = new mongoose.Schema({
    items: [itemSchema],
    subTotal: {
        type: Number,
        default: 0
    }
}, { versionKey: false, timestamps: true });

// create category model based on category schema ...
const CartModel = new mongoose.model('Cart', cartSchema);

module.exports = CartModel;
console.log('cart model is ready to use ...');
