/** Load mongoose external ODM/ORM module **/
const mongoose = require('mongoose');

// create a orderItem schema object by mongoose Schema class ...
const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, { versionKey: false, timestamps: true });

// create orderItem model based on category schema ...
const OrderItemModel = new mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItemModel;
console.log('order item model is ready to use ...');
