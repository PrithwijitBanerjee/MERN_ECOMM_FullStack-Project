/** Load express third-party module **/
const express = require('express');

/** Load authentication related controllers **/
const { loginHandler, logoutHandler, handleRefreshToken, handleProtectedRoute } = require('../controllers/auth.controllers');

/** Load validation rules **/
const { signInValidationRules } = require('../validation/validationRules');

/** Load sanitizeReq custom middlewares for sanitizing incoming requests **/
const sanitizeReq = require('../middlewares/sanitization.middlewares');
const { isLoggedIn, isLoggedOut } = require('../middlewares/auth.middlewares');

/** create a router service for authentication **/
const authRoute = express.Router({
    caseSensitive: true,
});

/** Handling all API related endpoints/ routes **/

authRoute.post('/login', isLoggedOut, signInValidationRules(), sanitizeReq, loginHandler)

    // logout user /POST
    .post('/logout', isLoggedIn, logoutHandler)

    // get new access token /GET
    .get('/refresh-token', handleRefreshToken)

    // protected route for frontend /GET
    .get('/protected', handleProtectedRoute);

module.exports = authRoute;
console.log('authentication routes is ready to use ...');