/** Load order related models **/
const OrderModel = require('../models/order.models');

/** Load order item related models **/
const OrderItemModel = require('../models/orderItem.models');

/** Load http-errors external module **/
const createError = require('http-errors');

exports.createOrder = async orderData => {
    try {
        const orderItemIds = await Promise.all(orderData.items.map(async item => {
            let newOrderItem = new OrderItemModel({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                total: item.total
            });
            newOrderItem = await newOrderItem.save();
            return newOrderItem?._id;
        }));
        let newOrder = new OrderModel({
            items: orderItemIds,
            shippingAddress1: orderData?.shippingAddress1,
            shippingAddress2: orderData?.shippingAddress2,
            city: orderData?.city,
            zip: orderData?.zip,
            country: orderData?.country,
            phone: orderData?.phone,
            totalAmount: orderData?.totalAmount,
            status: orderData?.status,
            user: orderData?.user,
        });
        newOrder = await newOrder.save();
        return {
            status: 201,
            message: 'Your order has been placed successfully',
            orderInfo: newOrder
        };
    } catch (error) {
        throw error;
    }
};

exports.fetchedAllOrders = async () => {
    try {
        const orders = await OrderModel.find({}).populate('user', 'name email -_id').populate({
            path: 'items',
            populate: {
                path: 'productId',
                populate: {
                    path: 'category',
                    select: "name -_id"
                }
            }
        }).exec();
        if (!orders?.length) {
            throw createError(404, 'No orders present !!!');
        }
        return {
            status: 200,
            message: 'All order lists has been fetched successfully',
            orders
        };
    } catch (error) {
        throw error;
    }
};

exports.fetchSingleOrder = async userId => {
    try {
        const order = await OrderModel.findOne({ user: userId }).populate('user', 'name email -_id').populate({
            path: 'items',
            populate: {
                path: 'productId',
                populate: {
                    path: 'category',
                    select: "name -_id"
                }
            }
        }).exec();
        if (!order) {
            throw createError(404, 'No order has been placed by the current user !!!');
        }
        return {
            status: 200,
            message: 'Order Information was fetched successfully',
            order
        };
    } catch (error) {
        throw error;
    }
};

exports.updateOrderStatus = async (orderId, orderStatus) => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate({ _id: orderId }, { status: orderStatus }, { new: true });
        if (!updatedOrder) {
            throw createError(404, 'Order Updation Failed, order of given id does not exist !!!');
        }
        return {
            status: 200,
            message: 'Order status of given id has been updated successfully',
            updatedOrder
        };
    } catch (error) {
        throw error;
    }
};

exports.removeOrder = async orderId => {
    try {
        const deletedOrder = await OrderModel.findOneAndDelete({ _id: orderId });
        if (!deletedOrder) {
            throw createError(404, 'Order Deletion Failed, Order of given id does not exist !!!');
        }
        await deletedOrder.items.forEach(async item => {
            await OrderItemModel.findOneAndDelete({ _id: item });
        });
        return {
            status: 200,
            message: 'Order of given id has been deleted successfully',
            deletedOrder
        };
    } catch (error) {
        throw error;
    }
};