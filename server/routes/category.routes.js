/** Load express third-party library/ backend framework **/
const express = require('express');

/** Load category related controllers **/
const categoryController = require('../controllers/category.controller');

/** create a router service for category **/
const categoryRouter = express.Router({
    caseSensitive: true
});

/** Load validation rules **/
const { categoryValidationRules } = require('../validation/categoryValidationRules');

/** Load sanitizeReq custom middlewares for sanitizing incoming requests **/
const sanitizeReq = require('../middlewares/sanitization.middlewares');
const { isLoggedIn, isAdmin } = require('../middlewares/auth.middlewares');

// handles all categories related api endpoints/ routes

// add new category by Admin /POST
categoryRouter.post('/add', isLoggedIn, isAdmin, categoryValidationRules(), sanitizeReq, categoryController.addNewCategory)

    // get all categories list /GET 
    .get('/list', categoryController.getAllCategories)

    // get single category by :slug as id list /GET 
    .get('/list/:slug', categoryController.getSingleCategory)

    // delete single category by :slug as id /DELETE
    .delete('/del/:slug', isLoggedIn, isAdmin, categoryController.deleteSingleCategory)

    // update single category by :slug as id /PUT or, /PATCH
    .all('/edit/:slug', isLoggedIn, isAdmin, categoryValidationRules(), sanitizeReq, categoryController.updateSingleCategory);

module.exports = categoryRouter;
console.log('category router is ready to use ...');