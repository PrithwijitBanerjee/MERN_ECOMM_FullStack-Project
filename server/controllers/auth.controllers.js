/** Load user related model **/
const UserModel = require('../models/users.models');

/** Load http-errors external module for handling http related errors **/
const createError = require('http-errors');

const { successResponseHandler } = require('../helpers/responseHandler');

/** Load jsonwebtoken external module **/
const jwt = require('jsonwebtoken');

/** Load createJwt utility function **/
const createJwt = require('../helpers/createJwt');

/** Load config module **/
const config = require('../config/config');

exports.loginHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // check the email exists or not
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw createError(404, 'Login Failed, this email id does not exist, register first !!!');
        }
        // verify the password
        const isPassValid = await new UserModel().validatePassword(password, user); // custom instance method ...   
        if (!isPassValid) {
            throw createError(401, 'Login Failed, Invalid emailId/password !!!');
        }
        // verify user is banned or not
        if (user.isBannedUsr) {
            throw createError(403, 'This user has been already banned, please contact with authority !!!');
        }
        // generate jwt token and save it in httpOnly cookie in client machine
        const access_token = createJwt(user._doc, config.app.jwtAcessKey, '7m');
        const refresh_token = createJwt(user._doc, config.app.jwtRefreshKey, '7d');
        // set httpOnly cookie for access token
        res.status(200).cookie('access_token', access_token, {
            maxAge: 7 * 60 * 1000, // this cookie valid only for 7 min
            httpOnly: true, // only web server through the http request  can access this cookie  and cannot be accessed or manipulated via JavaScript in the client browser.
            secure: true, // for https requests only
            sameSite: 'none'
        });
        // set httpOnly cookie for refresh token
        res.status(200).cookie('refresh_token', refresh_token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // this cookie valid only for 7 days
            httpOnly: true, // only web server through the http request  can access this cookie  and cannot be accessed or manipulated via JavaScript in the client browser.
            secure: true, // for https requests only
            sameSite: 'none'
        });
        // send response to client after login successful ...
        successResponseHandler(res, {
            status: 200,
            message: 'User has been logged in successfully !!!'
        });
    } catch (error) {
        next(error);
    }
};

exports.logoutHandler = async (req, res, next) => {
    try {
        // clear the cookie in client machine
        res.status(200).clearCookie('access_token'); // clearing access_token
        res.status(200).clearCookie('refresh_token'); // clearing refresh_token
        // success response after successful logout
        successResponseHandler(res, {
            status: 200,
            message: 'User has been logged Out successfully'
        });
    } catch (error) {
        next(error);
    }
};


exports.handleRefreshToken = async (req, res, next) => {
    try {
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token) {
            throw createError(401, 'Refresh Token not found, please login again !!!');
        }
        // verify the refresh token ...
        const decoded = await jwt.verify(refresh_token, config.app.jwtRefreshKey);
        if (!decoded) {
            throw createError(400, 'Invalid Refresh Token !!!');
        }
        // if verified, create new access_token 
        // Extract user details without 'exp' and 'iat' properties
        const { _id, name, email, address, phoneNo, isAdmin, isBannedUsr, password } = decoded;
        const userPayload = { _id, name, email, address, phoneNo, isAdmin, isBannedUsr, password };
        const access_token = createJwt(userPayload, config.app.jwtAcessKey, '7m');
        // set httpOnly cookie for access token
        res.status(200).cookie('access_token', access_token, {
            maxAge: 7 * 60 * 1000, // this cookie valid only for 15 min
            httpOnly: true, // only web server through the http request  can access this cookie  and cannot be accessed or manipulated via JavaScript in the client browser.
            secure: true, // for https requests only
            sameSite: 'none'
        });
        successResponseHandler(res, {
            status: 200,
            message: 'Access Token has been renewed'
        });
    } catch (error) {
        next(error);
    }
};

exports.handleProtectedRoute = async (req, res, next) => {
    try {
        const access_token = req.cookies.access_token;
        const refresh_token = req.cookies.refresh_token;
        if (!access_token && !refresh_token) {
            throw createError(401, 'You have to login first before access this route !!!');
        }
        if (refresh_token && !access_token) {
            throw createError(400, 'renew access token !!!');
        }
        successResponseHandler(res, {
            status: 200,
            message: 'Everything working fine'
        });
    } catch (error) {
        next(error);
    }
};



