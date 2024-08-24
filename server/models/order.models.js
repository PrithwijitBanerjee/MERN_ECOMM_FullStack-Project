/** Load mongoose external ODM/ORM module **/
const mongoose = require('mongoose');

// create a order schema object by mongoose Schema class ...
const orderSchema = new mongoose.Schema({
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrderItem',
            required: [true, '**order item is required']
        }],
    shippingAddress1: {
        type: String
    },
    shippingAddress2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateOrdered: {
        type: Date,
        dafault: Date.now
    }
}, { versionKey: false, timestamps: true });

// create order model based on category schema ...
const OrderModel = new mongoose.model('Order', orderSchema);

module.exports = OrderModel;
console.log('order model is ready to use ...');
