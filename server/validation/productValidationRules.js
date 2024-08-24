const { body } = require("express-validator");

// product validation rules ...
exports.productValidationRules = () => [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('**Product name should not empty')
        .isLength({ min: 3, max: 30 })
        .withMessage('**Product name Should be atleast 3 to 31 characters long'),
    body('desc')
        .trim()
        .notEmpty()
        .withMessage('**Product description should not empty')
        .isLength({ min: 3 })
        .withMessage('**Product Description atleast 3 characters long'),
    body('price')
        .trim()
        .notEmpty()
        .withMessage('**Product price should not empty')
        .isFloat({ gt: 0 })
        .withMessage('**Product price should be greater than zero'),
    body('sold')
        .optional()
        .isInt({ min: 0 })
        .withMessage('**Sold quantity should not be negative'),

    body('shipping_charge')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('**Shipping charge should not be negative'),

    body('qty')
        .notEmpty()
        .withMessage('**Product quantity should not be empty')
        .isInt({ min: 0 })
        .withMessage('**Product quantity should not be negative'),

    body('pro_image')
        .optional()
        .isURL()
        .withMessage('**Product image URL is not valid'),

    body('thumbnail_image')
        .optional()
        .isArray()
        .withMessage('**Thumbnail images should be an array')
        .custom(thumbnails => {
            thumbnails.forEach(thumbnail => {
                if (!thumbnail.match(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/)) {
                    throw new Error('**Each thumbnail image URL is not valid');
                }
            });
            return true;
        }),

    body('brand')
        .trim()
        .notEmpty()
        .withMessage('**Product brand should not be empty'),

    body('category')
        .notEmpty()
        .withMessage('**Product category should not be empty')
];
