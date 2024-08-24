/** Load cart related services **/
const cartServices = require('../services/cart.services');

/** Load order related services **/
const { createOrder, fetchedAllOrders, updateOrderStatus, removeOrder, fetchSingleOrder } = require('../services/order.services');

/** Load http-errors external module **/
const createError = require('http-errors');

const { successResponseHandler } = require('../helpers/responseHandler');

exports.placedOrder = async (req, res, next) => {
    try {
        const cartData = await cartServices.cart();

        if (!cartData.items.length || !cartData) {
            throw createError(400, 'Can not placed order, No item in the cart !!!');
        }

        const orderData = {
            items: cartData.items,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            totalAmount: cartData.subTotal,
            user: req.decoded._id,
            status: typeof (req.body.status) === "string" ? req.body.status : "Pending"
        };
        const { status, message, orderInfo } = await createOrder(orderData);
        successResponseHandler(res, {
            status,
            message,
            payload: orderInfo
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllOrders = async (req, res, next) => {
    try {
        const { status, message, orders } = await fetchedAllOrders();
        successResponseHandler(res, {
            status,
            message,
            payload: orders
        });
    } catch (error) {
        next(error);
    }
};


exports.getSingleOrder = async (req, res, next) => {
    try {
        const { _id: userId } = req.decoded;
        const { status, message, order } = await fetchSingleOrder(userId);
        successResponseHandler(res, {
            status,
            message,
            payload: order
        });
    } catch (error) {
        next(error);
    }
};

exports.editOrderStatus = async (req, res, next) => {
    try {
        if (req.method !== "PUT" && req.method !== "PATCH") {
            throw createError(405, `${req.method} method not allowed !!!`);
        }
        const { order_id } = req.params;
        const { orderStatus } = req.body;
        const { status, message, updatedOrder } = await updateOrderStatus(order_id, orderStatus);
        successResponseHandler(res, {
            status,
            message,
            payload: updateOrderStatus
        });
    } catch (error) {
        next(error);
    }
};

exports.cancelOrderById = async (req, res, next) => {
    try {
        const { order_id } = req.params;
        const { status, message, deletedOrder } = await removeOrder(order_id);
        successResponseHandler(res, {
            status,
            message,
            payload: deletedOrder
        });
    } catch (error) {
        next(error);
    }
};