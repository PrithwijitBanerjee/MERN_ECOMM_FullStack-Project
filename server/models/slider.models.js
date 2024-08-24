/** Load mongoose external ODM/ORM module **/
const mongoose = require('mongoose');

/** Load mongoose-unique-validator external plugin from npm for showing custom message for unique constraints **/
const uniqueValidator = require('mongoose-unique-validator');

// create a slider schema object by mongoose Schema class ...
const sliderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '**Slider title is required'],
        trim: true,
        unique: true,
        maxLength: [30, '**Slider title can not be exceeded 30 characters'],
        minLength: [3, '**Slider title can not be less than 3 characters']
    },
    slug: { // note: in slug we don't need trimming in slug, it automatically done by slug package 
        type: String,
        required: [true, '**Slug is required'],
        lowercase: true, // remember that: slug always be in lowercase
        unique: true
    },
    desc: {
        type: String,
        required: [true, '**Slider description is required'],
        trim: true,
        minLength: [3, '**Slider description can not be less than 3 characters']
    },
    slider_image: {
        type: String,
        required: [true, '**Slider image is required']
    }

}, { versionKey: false, timestamps: true });

/** Apply the uniqueValidator plugin to userSchema. **/
sliderSchema.plugin(uniqueValidator, { message: '{PATH} already exists' });

// create category model based on category schema ...
const SliderModel = new mongoose.model('Slider', sliderSchema);

module.exports = SliderModel;
console.log('Slider model is ready to use ...');
