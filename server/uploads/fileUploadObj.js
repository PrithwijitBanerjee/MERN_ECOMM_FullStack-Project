/** Load multer external middleware for handling multipart/formdata or, file upload **/
const multer = require('multer');

/** Load config module **/
const config = require('../config/config');

/** Load http-errors external module **/
const createError = require('http-errors');

/** Load path core module **/
const path = require('node:path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "avatar_url") {
            cb(null, __dirname + '/../public/images/users');
        }
        if (file.fieldname === "pro_image") {
            cb(null, __dirname + '/../public/images/products');
        }
        if (file.fieldname === "thumbnail_image") {
            cb(null, __dirname + '/../public/images/products');
        }
        if (file.fieldname === "slider_image") {
            cb(null, __dirname + '/../public/images/sliders');
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// const storage = multer.memoryStorage(); // for handling buffer image

function fileFilter(req, file, cb) {
    const extension = path.extname(file.originalname);
    if (!config.app.allowedFileTypes.includes(extension.substring(1))) {
        return cb(createError(400, 'Only *.jpg or, *.jpeg or, *.png or, *.gif files are allowed !!!'), false);
    }
    if (file?.fieldname) {
        return cb(null, true);
    }
}

// function fileFilter(req, file, cb) {
//     if (!file.mimetype.startsWith("image/")) {
//         return cb(createError(400, 'Only *.jpg or, *.jpeg or, *.png or, *.gif files are allowed !!!'), false);
//     }

//     if (file.size > Number(config.app.limitFileSize)) {
//         return cb(createError(400, 'File size are too large !!!'), false);
//     }
//     if (file?.fieldname) {
//         return cb(null, true);
//     }

// }

const upload = multer({
    storage: storage,
    limits: {
        fileSize: Number(config.app.limitFileSize)
    },
    fileFilter
});


module.exports = upload;