const { check, body } = require("express-validator");

// Regular expression to validate base64 string
const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;

// sign up validation rules ...
exports.signUpValidationRules = () => [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('**Name should not empty')
        .isLength({ min: 3, max: 31 })
        .withMessage('**Name Should be atleast 3 to 31 characters long')
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('**Name should contain only alphabetic characters and spaces'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('**email should not empty')
        .isEmail()
        .withMessage('**Invalid Email Id'),
    body("password")
        .notEmpty()
        .withMessage('**password is required')
        .isLength({ min: 6, max: 8 })
        .withMessage('**password should be minimum 8 characters and maximum 8 characters')
        .matches(/[A-Z]/)
        .withMessage('**Password should contain atleast one Uppercase character')
        .matches(/[a-z]/)
        .withMessage('**Password should contain atleast one lowercase character')
        .matches(/\d/)
        .withMessage('**Password should contain atleast one digit')
        .matches(/[@$!%*?&#]/)
        .withMessage('**Password should contain atleast one special characters: (@, $, !, %, *, ?, &, #)'),
    body('address')
        .trim()
        .notEmpty()
        .withMessage('**Address is required')
        .isLength({ min: 3 })
        .withMessage('**Address should be at least 3 characters'),
    body('phoneNo')
        .trim()
        .notEmpty()
        .withMessage('**Phone No. is required')
        .matches(/^\d{10}$/)
        .withMessage('**Phone No. should be exactly 10 digits'),
    // body('avatar_url')
    //     .trim()
    //     .optional()
    //     .isString()
    //     .withMessage('**Avater Image URL should be type of String'),
    body('avatar_url')
        .trim()
        .optional()
        .isString()
        .withMessage('**Avatar Image URL should be a string')
        .matches(base64Regex)
        .withMessage('**Avatar Image URL should be a valid base64 string'),
    body('isAdmin')
        .optional()
        .isBoolean()
        .withMessage('** isAdmin field should be type of Boolean'),
    body('isBannedUsr')
        .optional()
        .isBoolean()
        .withMessage('** isBannedUsr field should be type of Boolean')
];

// sign in validation rules ...
exports.signInValidationRules = () => [
    check('email')
        .trim()
        .notEmpty()
        .withMessage('**email should not empty')
        .isEmail()
        .withMessage('**Invalid Email Id'),
    check("password")
        .notEmpty()
        .withMessage('**password is required')
        .isLength({ min: 6, max: 8 })
        .withMessage('**password should be minimum 8 characters and maximum 8 characters')
        .matches(/[A-Z]/)
        .withMessage('**Password should contain atleast one Uppercase character')
        .matches(/[a-z]/)
        .withMessage('**Password should contain atleast one lowercase character')
        .matches(/\d/)
        .withMessage('**Password should contain atleast one digit')
        .matches(/[@$!%*?&#]/)
        .withMessage('**Password should contain atleast one special characters: (@, $, !, %, *, ?, &, #)')
];


exports.updatePasswordValidationRules = () => [
    check('email')
        .trim()
        .notEmpty()
        .withMessage('**email should not empty')
        .isEmail()
        .withMessage('**Invalid Email Id'),
    check("oldPass")
        .notEmpty()
        .withMessage('**old password is required')
        .isLength({ min: 6, max: 8 })
        .withMessage('**password should be minimum 8 characters and maximum 8 characters')
        .matches(/[A-Z]/)
        .withMessage('**Password should contain atleast one Uppercase character')
        .matches(/[a-z]/)
        .withMessage('**Password should contain atleast one lowercase character')
        .matches(/\d/)
        .withMessage('**Password should contain atleast one digit')
        .matches(/[@$!%*?&#]/)
        .withMessage('**Password should contain atleast one special characters: (@, $, !, %, *, ?, &, #)'),
    check("newPass")
        .notEmpty()
        .withMessage('**new password is required')
        .isLength({ min: 6, max: 8 })
        .withMessage('**password should be minimum 8 characters and maximum 8 characters')
        .matches(/[A-Z]/)
        .withMessage('**Password should contain atleast one Uppercase character')
        .matches(/[a-z]/)
        .withMessage('**Password should contain atleast one lowercase character')
        .matches(/\d/)
        .withMessage('**Password should contain atleast one digit')
        .matches(/[@$!%*?&#]/)
        .withMessage('**Password should contain atleast one special characters: (@, $, !, %, *, ?, &, #)'),
    check("confirmedPass")
        .notEmpty()
        .withMessage('**confirmed password is required')
        .isLength({ min: 6, max: 8 })
        .withMessage('**password should be minimum 8 characters and maximum 8 characters')
        .matches(/[A-Z]/)
        .withMessage('**Password should contain atleast one Uppercase character')
        .matches(/[a-z]/)
        .withMessage('**Password should contain atleast one lowercase character')
        .matches(/\d/)
        .withMessage('**Password should contain atleast one digit')
        .matches(/[@$!%*?&#]/)
        .withMessage('**Password should contain atleast one special characters: (@, $, !, %, *, ?, &, #)')
];

exports.forgetPasswordRules = () => [
    check('email')
        .trim()
        .notEmpty()
        .withMessage('**email should not empty')
        .isEmail()
        .withMessage('**Invalid Email Id'),
    check("newPass")
        .notEmpty()
        .withMessage('**new password is required')
        .isLength({ min: 6, max: 8 })
        .withMessage('**password should be minimum 8 characters and maximum 8 characters')
        .matches(/[A-Z]/)
        .withMessage('**Password should contain atleast one Uppercase character')
        .matches(/[a-z]/)
        .withMessage('**Password should contain atleast one lowercase character')
        .matches(/\d/)
        .withMessage('**Password should contain atleast one digit')
        .matches(/[@$!%*?&#]/)
        .withMessage('**Password should contain atleast one special characters: (@, $, !, %, *, ?, &, #)'),
    check('security_ques')
        .trim()
        .notEmpty()
        .withMessage('**security answer is required')
        .isLength({ max: 30 })
        .withMessage('**security answer should not be exceeded more than 30 characters')
];