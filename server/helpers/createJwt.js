/** Load jsonwebtoken external module **/
const jwt = require('jsonwebtoken');

/** Load http-errors external module **/
const createError = require('http-errors');

const createJwt = (payload, secret_key, expiryTime = '1m') => {
    try {
        if (typeof (payload) !== 'object' || Object.keys(payload).length === 0) {
            throw createError(400, 'user Info must be typed object and can not be empty !!!');
        }
        if (!expiryTime.length) {
            throw createError(400, 'expiryTime must be non-empty string !!!');
        }
        const token = jwt.sign(payload, secret_key, { expiresIn: expiryTime });
        return token;
    } catch (error) {
        throw error;
    }
};

module.exports = createJwt;