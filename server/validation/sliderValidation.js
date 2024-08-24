const { body } = require("express-validator");

// slider validation rules ...
exports.sliderValidationRules = () => [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('**Slider title should not empty')
        .isLength({ min: 3, max: 31 })
        .withMessage('**Slider title should be atleast 3 to 31 characters long')
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('**Slider title should contain only alphabetic characters and spaces'),
    body('desc')
        .trim()
        .notEmpty()
        .withMessage('**Slider description should not be empty')
        .isLength({ min: 3 })
        .withMessage('**Slider description can not be less than 3 characters'),
    body('slider_image').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('**Slider image is required');
        }
        return true;
    })
];