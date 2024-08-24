/** Load express-validator external module **/
const { validationResult } = require("express-validator");

/** Load http-errors external module **/
const createError = require('http-errors');

/** Load fs core module **/
const fs = require('node:fs');

/** Load path core module **/
const path = require('node:path');

/** Delete uploaded product file logic if validation fails **/
const deleteUploadedProductFiles = (files) => {
    if (files) {
        Object.values(files).forEach(fileArray => {
            fileArray.forEach(file => {
                fs.unlink(path.join(__dirname, '/../public/images/products/', file.filename), err => {
                    if (err) {
                        console.error('Failed to delete file:', file.filename, err);
                    }
                });
            });
        });
    }
}

/** Delete uploaded user file logic if validation fails **/
const deleteUploadedUserFiles = (file) => {
    if (file) {
        fs.unlink(path.join(__dirname, '/../public/images/users/', file.filename), err => {
            if (err) {
                console.error('Failed to delete file:', file.filename, err);
            }
        });
    }
}

/** Delete uploaded sliders file logic if validation fails **/
const deleteUploadedSliderFiles = (file) => {
    if (file) {
        fs.unlink(path.join(__dirname, '/../public/images/sliders/', file.filename), err => {
            if (err) {
                console.error('Failed to delete file:', file.filename, err);
            }
        });
    }
}

/** Define the custom middleware to apply the sanitization the req objects based on validation rules **/
const sanitizeReq = (req, res, next) => {
    const errors = validationResult(req);
    const errMsg = errors.array()[0]?.msg;
    if (!errors.isEmpty()) {
        if (req.files) {
            deleteUploadedProductFiles(req.files); // Delete uploaded product files if validation fails
        }
        if (req.file && req.file.fieldname === "avatar_url") {
            deleteUploadedUserFiles(req.file); // Delete uploaded user files if validation fails
        }
        if (req.file && req.file.fieldname === "slider_image") {
            deleteUploadedSliderFiles(req.file); // Delete uploaded slider files if validation fails
        }
        return next(createError(422, errMsg)); // 422 status code represents user validation related errors (UnprocessableEntity)
    }
    next();
}

module.exports = sanitizeReq;