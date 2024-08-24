/** Load express third-party library/ backend framework **/
const express = require('express');

/** Load category related controllers **/
const productController = require('../controllers/product.controller');

/** Load upload as middleware module **/
const upload = require('../uploads/fileUploadObj');

/** create a router service for product **/
const productRouter = express.Router({
    caseSensitive: true
});

/** Load validation rules **/
const { productValidationRules } = require('../validation/productValidationRules');

/** Load sanitizeReq custom middlewares for sanitizing incoming requests **/
const sanitizeReq = require('../middlewares/sanitization.middlewares');

/** Load authentication related middlewares **/
const { isLoggedIn, isAdmin } = require('../middlewares/auth.middlewares');

// handles all categories related api endpoints/ routes

// add new product by Admin /POST
productRouter.post('/add', isLoggedIn, isAdmin, upload.fields([{ name: 'pro_image', maxCount: 1 }, { name: 'thumbnail_image', maxCount: 3 }]), productValidationRules(), sanitizeReq, productController.addNewProduct)

    // get all list of products with pagination /GET
    .get('/list', productController.getAllProducts)

    // get single product by :slug as id /GET
    .get('/list/:slug', productController.getSingleProduct)

    // search products by keywords /GET
    .get('/search/:keywords', productController.searchedProducts)

    // delete single product by :slug as id /DELETE (Only Admin)
    .delete('/del/:slug', isLoggedIn, isAdmin, productController.delSingleProduct)

    // update product by :slug as id /PUT or, /PATCH (Only Admin)
    .all('/edit/:slug', isLoggedIn, isAdmin, upload.fields([{ name: 'pro_image', maxCount: 1 }, { name: 'thumbnail_image', maxCount: 3 }]), productController.updateProductBySlug);

module.exports = productRouter;
console.log('product router is ready to use ...');