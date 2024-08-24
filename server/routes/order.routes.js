/** Load express external module/ third-party packages **/
const express = require('express');

/** Load order related controllers **/
const orderController = require('../controllers/order.controllers');

/** Load authentication related middlewares **/
const { isLoggedIn, isAdmin } = require('../middlewares/auth.middlewares');

/** Load order related validation rules **/
const { orderValidationRules, orderStatusValidationRules } = require('../validation/orderValidationRules');

/** Load sanitizeReq custom middlewares for sanitizing incoming requests **/
const sanitizeReq = require('../middlewares/sanitization.middlewares');

/** create a router service for order **/
const orderRouter = express.Router({
    caseSensitive: true
});

/** Handles all order related routes/ API Endpoints  **/

// create a new order /POST
orderRouter.post('/place', isLoggedIn, orderValidationRules(), sanitizeReq, orderController.placedOrder)

    // get all orders /GET
    .get('/list', isLoggedIn, orderController.getAllOrders)

    // get single order information by :order_id (User/Admin)
    .get('/list/single', isLoggedIn, orderController.getSingleOrder)

    // cancel order by :order_id by Admin /DELETE
    .delete('/cancel/:order_id', isLoggedIn, orderController.cancelOrderById)

    // update order status by :order_id by Admin /PUT or, /PATCH
    .all('/edit/:order_id', isLoggedIn, isAdmin, orderStatusValidationRules(), sanitizeReq, orderController.editOrderStatus);


module.exports = orderRouter;
console.log('order router is ready to use ...');
