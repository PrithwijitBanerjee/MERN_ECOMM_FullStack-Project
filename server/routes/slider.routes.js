/** Load express third-party library/ backend framework **/
const express = require('express');

/** Load slider related controllers **/
const sliderController = require('../controllers/slider.controllers');

/** Load upload module **/
const upload = require('../uploads/fileUploadObj');

/** Load validation rules **/
const { sliderValidationRules } = require('../validation/sliderValidation');

/** Load sanitizeReq custom middlewares for sanitizing incoming requests **/
const sanitizeReq = require('../middlewares/sanitization.middlewares');

/** Load custom authentication middlewares **/
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth.middlewares');

/** create a router service for slider/ carousel  **/
const sliderRouter = express.Router({
    caseSensitive: true
});

// handles all user slider related api endpoints/ routes

// add new slider of product by Admin /POST
sliderRouter.post('/add', isLoggedIn, isAdmin, upload.single('slider_image'), sliderValidationRules(), sanitizeReq, sliderController.addSlider)

    // get all sliders /GET
    .get('/list', sliderController.getAllSliders)

    // delete single slide by :slug as id /DELETE (Admin)
    .delete('/del/:slug', isLoggedIn, isAdmin, sliderController.removeSlide)

    // edit single slide by :slug as id /PUT or, /PATCH (Admin)
    .all('/edit/:slug', isLoggedIn, isAdmin, upload.single('slider_image'), sliderController.editSingleSlider);

module.exports = sliderRouter;
console.log('slider  router is loading ...');

