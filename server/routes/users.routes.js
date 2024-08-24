/** Load express third-party library/ backend framework **/
const express = require('express');

/** Load user related controllers **/
const userControllers = require('../controllers/users.controllers');
const controller = require('../controllers/users.controllers');

/** Load validation rules **/
const { signUpValidationRules, updatePasswordValidationRules, forgetPasswordRules } = require('../validation/validationRules');

/** Load sanitizeReq custom middlewares for sanitizing incoming requests **/
const sanitizeReq = require('../middlewares/sanitization.middlewares');

/** Load upload module **/
const upload = require('../uploads/fileUploadObj');

/** Load custom authentication middlewares **/
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth.middlewares');

const validateItemId = require('../middlewares/validateItemId.middlewares');

/** create a router service for user **/
const userRouter = express.Router({
    caseSensitive: true,
});

/** Handles all users related routes/ API Endpoints **/

/** process user registration /POST **/
userRouter.post('/register', isLoggedOut, upload.single('avatar_url'), signUpValidationRules(), sanitizeReq, userControllers.registerUser)

    /** verify user with email for complete registration **/
    // .post('/verify', controller.activateUserAccount)

    /** get all users including search and pagination only Admin can access it (Private Route)  /GET **/
    .get('/all_users', isLoggedIn, isAdmin, userControllers.getAllUsers)

    /** get particular user by :id  only Admin can access it (Private Route) /GET**/
    .get('/all_users/:id', isLoggedIn, userControllers.getSingleUsrById)

    /** delete single user by :id only Admin can access it (Private Route) /DELETE **/
    .delete('/del/:id', isLoggedIn, isAdmin, userControllers.delUsrById)

    /** update single user by :id /PUT or, /PATCH **/
    .all('/edit/:id', isLoggedIn, isAdmin, validateItemId, upload.single('avatar_url'), controller.updateUser)

    /** banned user by :id by Admin /PUT or, /PATCH **/
    .all('/ban-user/:id', isLoggedIn, isAdmin, userControllers.handleBanUserById)

    /** unbanned user by :id by Admin /PUT or, /PATCH **/
    .all('/unban-user/:id', isLoggedIn, isAdmin, userControllers.handleUnbanUserById)

    /** update user password /PUT or, /PATCH **/
    .all('/update-password', isLoggedIn, updatePasswordValidationRules(), sanitizeReq, userControllers.handleUpdateUserPass)

    /** foget user password /POST **/
    .post('/forget-password', forgetPasswordRules(), sanitizeReq, userControllers.handleFogetPassword);

module.exports = userRouter;
console.log("user router is loading ...");