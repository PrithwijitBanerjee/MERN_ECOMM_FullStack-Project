const { body } = require('express-validator');

exports.orderValidationRules = () => [
    // Validate shippingAddress1 (optional, but if present, must be a string)
    body('shippingAddress1')
        .notEmpty()
        .withMessage('**Shipping address 1 must be required')
        .isString().withMessage('Shipping address 1 must be a valid string.'),

    // Validate shippingAddress2 (optional, but if present, must be a string)
    body('shippingAddress2')
        .notEmpty()
        .withMessage('**Shipping address 2 must be required')
        .isString().withMessage('Shipping address 2 must be a valid string.'),

    // Validate city
    body('city')
        .notEmpty().withMessage('City is required.')
        .isString().withMessage('City must be a valid string.'),

    // Validate zip
    body('zip')
        .notEmpty().withMessage('Zip code is required.')
        .isNumeric().withMessage('Zip code must be a valid Number.'),

    // Validate country
    body('country')
        .notEmpty().withMessage('Country is required.')
        .isString().withMessage('Country must be a valid string.'),

    // Validate phone
    body('phone')
        .notEmpty().withMessage('Phone number is required.')
        .isNumeric().withMessage('Phone number must be a valid number.')
        .isLength({ min: 10 }).withMessage('Phone number must be at least 10 characters long.'),

    // Validate status (optional, but if present, must be one of the enum values)
    body('status')
        .optional()
        .isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
        .withMessage('Invalid status value.'),

    // Validate user (optional, but if present, must be a valid ObjectId)
    body('user')
        .optional()
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage('User must be a valid User ID.')
];


exports.orderStatusValidationRules = () => [
    // Validate status (optional, but if present, must be one of the enum values)
    body('orderStatus')
        .notEmpty().withMessage('**Order Status is required')
        .isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
        .withMessage('Invalid status value.')
];