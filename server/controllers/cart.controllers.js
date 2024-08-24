const { cart, addItem } = require("../services/cart.services");

/** common services function **/
const findItemById = require("../services/findItemById");

/** Load Product related models **/
const ProductModel = require('../models/product.models');

/** Load http-errors external module **/
const createError = require('http-errors');

const { successResponseHandler } = require('../helpers/responseHandler');

exports.addItemToCart = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const quantity = +req.body.quantity;
        const carts = await cart();
        const product = await findItemById(ProductModel, productId);
        //--If Cart Exists ----
        if (carts) {
            //---- check if index exists ----
            const indexFound = carts.items.findIndex(item => item.productId._id == productId);
            //------this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  -------
            if (indexFound !== -1 && quantity <= 0) {
                carts.items.splice(indexFound, 1);
                if (carts.items.length == 0) {
                    carts.subTotal = 0;
                } else {
                    carts.subTotal = carts.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
            }
            else if (indexFound !== -1) { //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
                carts.items[indexFound].quantity = quantity;
                carts.items[indexFound].total = carts.items[indexFound].quantity * product.price;
                carts.items[indexFound].price = product.price
                carts.subTotal = carts.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
            else if (quantity > 0) {  //----Check if Quantity is Greater than 0 then add item to items Array ----
                carts.items.push({
                    productId: productId,
                    quantity: quantity,
                    price: product.price,
                    total: parseInt(product.price * quantity)
                })
                carts.subTotal = carts.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
            else { //----if quantity of price is 0 throw the error -------
                throw createError(400, 'Cannot add item to cart, invalid request !!!');
            }
            let data = await carts.save();
            successResponseHandler(res, {
                status: 200,
                message: "item has been added to cart",
                payload: data
            });
        } else {  //------------ if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created------------
            const cartData = {
                items: [
                    {
                        productId,
                        quantity,
                        price: product?.price,
                        total: parseInt(product.price * quantity)
                    }
                ],
                subTotal: parseInt(product.price * quantity)
            };
            const { status, message, newItem } = await addItem(cartData);
            successResponseHandler(res, {
                status,
                message,
                payload: newItem
            });
        };

    } catch (error) {
        next(error);
    }
};

exports.removeItemFromCart = async (req, res, next) => {
    try {
        const { productId } = req.body;
        let carts = await cart();

        if (!carts) {
            throw createError(400, 'Cart Not Found');
        }

        const indexFound = carts.items.findIndex(item => item.productId._id == productId);

        if (indexFound !== -1) {
            carts.items.splice(indexFound, 1);
            carts.subTotal = carts.items.length ? carts.items.reduce((acc, next) => acc + next.total, 0) : 0;

            let data = await carts.save();
            successResponseHandler(res, {
                status: 200,
                message: "Product removed from cart",
                payload: data
            });
        } else {
            throw createError(404, 'Product not found in cart of given id !!!');
        }
    } catch (error) {
        next(error);
    }
};


exports.getCart = async (_, res, next) => {
    try {
        let carts = await cart();
        if (!carts) {
            throw createError(404, 'Cart Not Found');
        }
        successResponseHandler(res, {
            status: 200,
            message: 'Cart data are fetched successfully',
            payload: carts
        });
    } catch (error) {
        next(error);
    }
};

exports.emptyCart = async (req, res) => {
    try {
        let carts = await cart();
        carts.items = [];
        carts.subTotal = 0
        let data = await carts.save();
        successResponseHandler(res, {
            status: 200,
            message: "Cart Has been emptied",
            data
        });
    } catch (error) {
        next(error);
    }
}
