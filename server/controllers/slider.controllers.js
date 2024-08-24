/** Load slider related models **/
const SliderModel = require('../models/slider.models');

/** Load config custom module **/
const config = require('../config/config');

const { successResponseHandler } = require('../helpers/responseHandler');

/** Load http-errors external module **/
const createError = require('http-errors');


/** Load slider related services **/
const { createNewSlider, fetchedSliders, updateSingleSlider, cancelSingleSlide } = require('../services/slider.services');
const { default: slugify } = require('slugify');

exports.addSlider = async (req, res, next) => {
    try {
        const { title, desc } = req.body;
        const slider_image = `${config.app.baseUrl}/sliders/${req.file.filename}`;
        const { status, message, sliderDoc } = await createNewSlider(title, desc, slider_image);
        successResponseHandler(res, {
            status,
            message,
            payload: sliderDoc
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllSliders = async (_, res, next) => {
    try {
        const { status, message, sliders } = await fetchedSliders();
        successResponseHandler(res, {
            status,
            message,
            payload: sliders
        });
    } catch (error) {
        next(error);
    }
};

exports.editSingleSlider = async (req, res, next) => {
    try {
        if (req.method !== "PUT" && req.method !== "PATCH") {
            throw createError(405, `${req.method} method not allowed in this route !!!`);
        }
        const updated_data = {};
        const { slug } = req.params;
        for (let key in req.body) {
            if (['title', 'desc'].includes(key)) {
                updated_data[key] = req.body[key];
            }
        }
        if (req.file) {
            updated_data.slider_image = `${config.app.baseUrl}/sliders/${req.file.filename}`;
        }
        if (updated_data.title) {
            updated_data.slug = slugify(updated_data.title);
        }
        const { status, message, data } = await updateSingleSlider(updated_data, slug);
        successResponseHandler(res, {
            status,
            message,
            payload: data
        });
    } catch (error) {
        next(error);
    }
};

exports.removeSlide = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { status, message, deletedData } = await cancelSingleSlide(slug);
        successResponseHandler(res, {
            status,
            message,
            payload: deletedData
        });
    } catch (error) {
        next(error);
    }
};