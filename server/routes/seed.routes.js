/** Load express third-party library/ backend framework **/
const express = require('express');

/** Load seed users controllers **/
const seedUsrController = require('../controllers/seedUsr.controllers');

/** Load seed products controllers **/
const seedProductController = require('../controllers/seedProducts.controller');

/** Load seed categories controllers **/
const seedCategoryController = require('../controllers/seedCategory.controller');

/** create a router service for seed (dummy data in DB) **/
const seedRouter = express.Router({
    caseSensitive: true
});

// handles all user seed related api endpoints/ routes
seedRouter.get('/users', seedUsrController.seedUsers);

// handles all category seed related api endpoints/ routes
seedRouter.get('/categories', seedCategoryController.seedCategories);

// handles all products seed related api endpoints/ routes
seedRouter.get('/products', seedProductController.seedProducts);


module.exports = seedRouter;
console.log('seed  router is loading ...');

