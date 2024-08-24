const { body } = require("express-validator");

// category validation rules ...
exports.categoryValidationRules = () => [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('**Category name should not empty')
        .isLength({ min: 3, max: 31 })
        .withMessage('**Category name Should be atleast 3 to 31 characters long'),
];
