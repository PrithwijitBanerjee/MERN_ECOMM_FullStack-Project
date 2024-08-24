/** Load express third-party library/ backend framework **/
const express = require('express');

/** Load cart related controllers **/
const cartController = require('../controllers/cart.controllers');

/** create a router service for cart **/
const cartRouter = express.Router({
    caseSensitive: true
});

/** Load validation rules **/
const { cartValidationRules } = require('../validation/cartValidationRules');

/** Load sanitizeReq custom middlewares for sanitizing incoming requests **/
const sanitizeReq = require('../middlewares/sanitization.middlewares');

// handles all cart related api endpoints/ routes

// add item to cart by user /POST
cartRouter.post('/add', cartValidationRules(), sanitizeReq, cartController.addItemToCart)

    // get all products carts /GET
    .get('/list', cartController.getCart)

    // remove any product from cart /DELETE
    .delete('/remove-item-cart', cartController.removeItemFromCart)

    // clear the entire cart /Delete
    .delete('/empty-cart', cartController.emptyCart);

module.exports = cartRouter;
console.log('cart router is ready to use ...');