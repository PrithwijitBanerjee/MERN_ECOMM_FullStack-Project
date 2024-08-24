/** Load Cart related models **/
const CartModel = require('../models/cart.models');


exports.cart = async () => {
    try {
        const carts = await CartModel.find({}).populate({
            path: 'items.productId',
            select: "_id name price qty pro_image"
        }); 
        return carts[0];
    } catch (error) {
        throw error;
    }
};

exports.addItem = async cartData => {
    try {
        const cartDoc = new CartModel(cartData);
        const newItem = await cartDoc.save();
        return {
            status: 200,
            message: 'Item has been added to cart successfully',
            newItem
        };
    } catch (error) {
        throw error;
    }
};

