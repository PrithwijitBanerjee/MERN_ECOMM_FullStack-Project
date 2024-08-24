const { body } = require('express-validator');

// Cart validation rules
exports.cartValidationRules = () => [
    body('items.*.productId')
        .notEmpty()
        .withMessage('Product reference is required')
        .isMongoId()
        .withMessage('Invalid Product reference'),

    body('items.*.quantity')
        .notEmpty()
        .withMessage('Item Quantity is required for order')
        .isInt({ min: 1 })
        .withMessage('Item Quantity can not be less than 1.'),
];
