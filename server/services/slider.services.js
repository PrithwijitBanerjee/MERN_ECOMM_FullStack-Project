/** Load slider related models **/
const SliderModel = require('../models/slider.models');

/** Load slugify external module **/
const slugify = require('slugify');

/** Load http-errors external module **/
const createError = require('http-errors');

/** Load fs core module **/
const fs = require('node:fs/promises');

/** Load path core module **/
const path = require('node:path');

exports.createNewSlider = async (title, desc, slider_image) => {
    try {
        const sliderDoc = new SliderModel({
            title,
            slug: slugify(title),
            desc,
            slider_image
        });
        await sliderDoc.save();
        return {
            status: 201,
            message: 'Banner was added successfully',
            sliderDoc
        }
    } catch (error) {
        throw error;
    }
};

exports.fetchedSliders = async () => {
    try {
        const sliders = await SliderModel.find({}).lean().exec();
        if (!sliders.length) {
            throw createError(404, 'No Sliders present !!!');
        }
        return {
            status: 200,
            message: 'Sliders were fetched successfully',
            sliders
        }
    } catch (error) {
        throw error;
    }
};

exports.updateSingleSlider = async (updated_data, slug) => {
    try {
        const options = { new: true };
        const filter = { slug };
        const updates = {
            $set: updated_data
        };
        const res = {};
        const slider = await SliderModel.findOne({ slug });
        if (!slider) {
            await fs.unlink(__dirname + `/../public/images/sliders/${path.basename(updated_data?.slider_image)}`);
            throw createError(404, 'Updation failed, slider of given id does not exist !!!');
        }
        if (updated_data?.slider_image) {
            await fs.unlink(__dirname + `/../public/images/sliders/${path.basename(slider?.slider_image)}`);
            const data = await SliderModel.findOneAndUpdate(filter, updates, options);
            res.status = 200;
            res.message = 'Slider of given id has been updated successfully',
                res.data = data;
        }
        return res;
    } catch (error) {
        throw error;
    }
};

exports.cancelSingleSlide = async slug => {
    try {
        const filter = { slug };
        const slider = await SliderModel.findOne({ slug });
        if (!slider) {
            throw createError(404, 'Deletion failed, Slider of given id does not exist !!!');
        }
        await fs.unlink(__dirname + `/../public/images/sliders/${path.basename(slider?.slider_image)}`);
        const deletedData = await SliderModel.findOneAndDelete(filter);
        return {
            status: 200,
            message: 'Slider of given id has been deleted successfully',
            deletedData
        };
    } catch (error) {
        throw error;
    }
};