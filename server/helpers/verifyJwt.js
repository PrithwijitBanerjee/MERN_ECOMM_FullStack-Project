/** Load jsonwebtoken external module **/
const jwt = require('jsonwebtoken');

/** Load http-errors external module **/
const createError = require('http-errors');

const verifyJwt = async (token, secretKey) => {
    try {
        const decoded = await jwt.verify(token, secretKey, errMsg);
        if (!decoded) {
            throw createError(401, errMsg);
        }
        return decoded;
    } catch (error) {
        throw error;
    }
};

module.exports = verifyJwt;