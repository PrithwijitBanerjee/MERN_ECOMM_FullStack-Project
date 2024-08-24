/** Load http-errors external module **/
const createError = require('http-errors');

/** Load jsonwebtoken external module **/
const jwt = require('jsonwebtoken');

/** Load config module **/
const config = require('../config/config');

exports.isLoggedIn = async (req, res, next) => {
    try {
        const access_token = req.cookies.access_token;
        if (!access_token) {
            throw createError(401, 'Access token is required, please login !!!');
        }
        const decoded = await jwt.verify(access_token, config.app.jwtAcessKey);
        if (!decoded) {
            throw createError(401, 'Invalid Access token, please login again !!!');
        }        
        req.decoded = decoded;
        next();
    } catch (error) {
        res.clearCookie('access_token');
        next(error);
    }
};

exports.isLoggedOut = async (req, res, next) => {
    try {
        const access_token = req.cookies.access_token;
        if (access_token) {
            // the token may be expired ...
            try {
                const decoded = await jwt.verify(access_token, config.app.jwtAcessKey);
                if (decoded) {
                    throw createError(400, `${decoded?.name} already logged in !!!`);
                }
            } catch (error) {
                throw error;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        if (!req.decoded.isAdmin) {
            throw createError(403, 'Forbidden, Only Admin can access this route !!!');
        }
        next(); // calling to the next middleware ...
    } catch (error) {
        next(error);
    }
};