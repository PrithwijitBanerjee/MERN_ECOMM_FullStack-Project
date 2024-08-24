/** Load http-errors external module for handling http related errors **/
const createError = require('http-errors');

/** Load path core modules **/
const path = require('path');

/** Load fs core module **/
const fs = require('node:fs');

/** Load jsonwebtoken external module **/
// const jwt = require('jsonwebtoken');

/** Load user related models **/
const UserModel = require('../models/users.models');

/** Load verifyAndSendEmail utility function **/
// const verifyAndSendEmail = require('../helpers/email');

/** Load unlinkImg utility function **/
const unlinkImg = require('../helpers/unlinkImgFile');

/** Load config module **/
const config = require('../config/config');

/** Load createJwt utility function **/
// const createJwt = require('../helpers/createJwt');

const { successResponseHandler } = require('../helpers/responseHandler');

/** Load users services **/
const findItemById = require('../services/findItemById');

// Controller object -- module scaffolding
const controller = {};

// create a new user account  with email sent verification ...
// controller.registerUser = async (req, res, next) => {
//     try {
//         const { name, email, phoneNo, password, address, isAdmin, isBannedUsr } = req.body;
//         const userInfo = { name, email, phoneNo, password, address };
//         if (isAdmin) {
//             userInfo.isAdmin = isAdmin;
//         }
//         if (isBannedUsr) {
//             userInfo.isBannedUsr = isBannedUsr;
//         }
//         if (req.file) {
//             userInfo.avatar_url = `${config.app.baseUrl}/users/${req.file.filename}`;
//         }
//         // check whether user exists or, not ...
//         const isExistsUsr = await UserModel.exists({ email: userInfo?.email });
//         if (!isExistsUsr) {
//             // create jwt token to save user's info temporarily...
//             const token = createJwt(userInfo, '1m');
//             // setup SMTP server for sending email to client user and prepare email body
//             const emailData = {
//                 to: userInfo?.email,
//                 subject: 'User Account Activation Email',
//                 html: `
//                     <h2>Dear ${userInfo?.name}!</h2>
//                     <p>Please click here to <a href="${config.app.clientUrl}/api/v1/users/activate/${token}" target="_blank">activate your account</a></p>
//                 `
//             }
//             try {
//                 await verifyAndSendEmail(emailData);
//                 successResponseHandler(res, {
//                     status: 200,
//                     message: `Please go to your ${userInfo?.email} for completing your registration process`,
//                     payload: token
//                 });
//             } catch (error) {
//                 next(createError(500, "Failed to send verification email !!!"));
//                 return;
//             }
//         } else {
//             next(createError(409, 'User of given email already exists, please sign in !!!'));
//         }
//     } catch (error) {
//         next(error);
//     }
// };

// with email sent verification
// controller.activateUserAccount = async (req, res, next) => {
//     try {
//         const token = req.body.token;
//         if (token) {
//             const decoded = await jwt.verify(token, config.app.jwtActivationKey);
//             if (decoded) {
//                 const userDoc = new UserModel(decoded);
//                 await userDoc.save();
//                 successResponseHandler(res, {
//                     status: 201,
//                     message: 'User was registered successfully !!!'
//                 });
//             } else {
//                 next(createError(400, 'Invalid token !!!'));
//             }
//         } else {
//             next(createError(400, 'Token is needed for completing your registration !!!'));
//         }
//     } catch (error) {
//         next(error);
//     }
// };


controller.registerUser = async (req, res, next) => {
    try {
        const { name, email, phoneNo, password, address, isAdmin, isBannedUsr } = req.body;
        const userInfo = { name, email, phoneNo, password, address };
        if (isAdmin) {
            userInfo.isAdmin = isAdmin;
        }
        if (isBannedUsr) {
            userInfo.isBannedUsr = isBannedUsr;
        }
        if (req.file) {
            userInfo.avatar_url = `${config.app.baseUrl}/users/${req.file.filename}`;
            // if (req.file.size > config.app.limitFileSize) {
            //     throw createError(400, 'Files are too large !!!');
            // }
            // userInfo.avatar_url = req.file.buffer.toString('base64');
        }
        // check whether user exists or, not ...
        const isExistsUsr = await UserModel.exists({ $or: [{ email: userInfo?.email }, { phoneNo: userInfo?.phoneNo }] });
        if (!isExistsUsr) {
            // save user info into db ...
            const userDoc = new UserModel(userInfo);
            await userDoc.save();
            successResponseHandler(res, {
                status: 201,
                message: 'User was registered successfully !!!'
            });
        } else {
            fs.unlinkSync(path.join(__dirname, '/../public/images/users/', req.file.filename));
            next(createError(409, 'User of given email/ phone No. already exists, please sign in !!!'));
        }
    } catch (error) {
        next(error);
    }
};

// get all users list (private API only Admin)
controller.getAllUsers = async (req, res, next) => {
    try {
        const searchedKeywords = req.query.search || "";
        const page = Number(req.query.page) || 1; // page no.
        const limit = Number(req.query.limit) || 5; // no of users in per page
        const regexExp = new RegExp('.*' + searchedKeywords + '.*', 'i');
        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: regexExp } },
                { email: { $regex: regexExp } }
            ]
        };
        const options = {
            password: 0
        }
        const users = await UserModel.find(filter).select(options).limit(limit).skip((page - 1) * limit).sort({ name: -1 }).exec();
        const totDocuments = await UserModel.find(filter).countDocuments().exec();
        if (users.length) {
            successResponseHandler(res, {
                status: 200,
                payload: {
                    users,
                    pagination: {
                        currentPageNo: page,
                        limit,
                        totalPages: Math.ceil(totDocuments / limit),
                        prevPage: page - 1 > 0 ? page - 1 : null,
                        nextPage: page + 1 <= Math.ceil(totDocuments / limit) ? page + 1 : null,
                    }
                }
            });
        } else {
            next(createError(404, 'No users present in the list !!!'));
        }
    } catch (error) {
        next(error);
    }
};


controller.updateUser = async (req, res, next) => {
    try {
        if (req.method !== "PUT" && req.method !== "PATCH") {
            next(createError(405, `${req.method} not allowed for update user !!!`));
            return;
        }
        const _uId = req.params.id;
        const update_data = {};
        const user = await findItemById(UserModel, _uId);
        const updateOptions = { new: true, runValidators: true, context: 'query' }; // to apply schema validations when we update any field
        for (let key in req.body) {
            if (['name', 'email', 'phoneNo', 'password', 'address', 'isAdmin', 'isBannedUsr'].includes(key)) {
                update_data[key] = req.body[key];
            }
        }
        if (req.file) {
            // if (req.file.size > config.app.limitFileSize) {
            //     throw createError(400, 'Files are too large !!!');
            // }
            // update_data.avatar_url = req.file.buffer.toString('base64');
            update_data.avatar_url = `${config.app.baseUrl}/users/${req.file.filename}`;
        }
        if (Object.keys(update_data)?.length <= 0) {
            next(createError(400, 'Please select atleast one field to update user !!!'));
            return;
        }
        if (!user) {
            throw createError(404, 'Updation failed, user of given id does not exist !!!');
        }
        if (path.basename(user?.avatar_url) === "male-user-placeholder.png" || !(update_data?.avatar_url)) {
            await UserModel.updateOne({ _id: _uId }, update_data, updateOptions);
        } else {
            unlinkImg(__dirname + `/../public/images/users/${path.basename(user?.avatar_url)}`, async err => {
                if (err) {
                    throw err;
                }
                await UserModel.updateOne({ _id: _uId }, update_data, updateOptions);
            });
        }
        successResponseHandler(res, {
            status: 200,
            message: 'User of given id has been updated successfully !!!'
        });
    } catch (error) {
        next(error);
    }
};

controller.handleBanUserById = async (req, res, next) => {
    try {
        if (req.method !== "PUT" && req.method !== "PATCH") {
            next(createError(405, `${req.method} not allowed for update user !!!`));
            return;
        }
        const _uId = req.params.id;
        await findItemById(UserModel, _uId, "-password");
        const updateOptions = { new: true, runValidators: true, context: 'query' };
        const updatedUser = await UserModel.findByIdAndUpdate(_uId, { isBannedUsr: true }, updateOptions).select("-password");
        if (!updatedUser) {
            throw createError(400, 'Cannot banned user properly !!!');
        }
        successResponseHandler(res, {
            status: 200,
            message: 'User of given id has been banned successfully'
        });
    } catch (error) {
        next(error);
    }
};

controller.handleUnbanUserById = async (req, res, next) => {
    try {
        if (req.method !== "PUT" && req.method !== "PATCH") {
            next(createError(405, `${req.method} not allowed for update user !!!`));
            return;
        }
        const _uId = req.params.id;
        await findItemById(UserModel, _uId, "-password");
        const updateOptions = { new: true, runValidators: true, context: 'query' };
        const updatedUser = await UserModel.findByIdAndUpdate(_uId, { isBannedUsr: false }, updateOptions).select("-password");
        if (!updatedUser) {
            throw createError(400, 'Cannot unbanned user properly !!!');
        }
        successResponseHandler(res, {
            status: 200,
            message: 'User of given id has been unbanned successfully'
        });
    } catch (error) {
        next(error);
    }
};

// get paticular user by :id 
controller.getSingleUsrById = async (req, res, next) => {
    try {
        const _uId = req.params.id;
        const user = await findItemById(UserModel, _uId, { password: 0 });
        successResponseHandler(res, {
            status: 200,
            payload: {
                user,
            }
        });
    } catch (error) {
        next(error);
    }
};

// delete user by :id
controller.delUsrById = async (req, res, next) => {
    try {
        const _uId = req.params.id;
        const user = await findItemById(UserModel, _uId, { password: 0 });
        if (!user) {
            throw createError(404, 'Deletion Failed, user of given id does not exist !!!');
        }
        if (path.basename(user?.avatar_url) === "male-user-placeholder.png") {
            await UserModel.deleteOne({ _id: _uId });
        } else {
            unlinkImg(__dirname + `/../public/images/users/${path.basename(user?.avatar_url)}`, async err => {
                if (err) {
                    throw err;
                }
                await UserModel.deleteOne({ _id: _uId });
            });
        }
        successResponseHandler(res, {
            status: 200,
            message: 'User of given id has been deleted successfully !!!',
            payload: {
                user
            }
        });
    } catch (error) {
        next(error);
    }
};

controller.handleUpdateUserPass = async (req, res, next) => {
    try {
        if (req.method !== "PUT" && req.method !== "PATCH") {
            throw createError(405, `${req.method} not allowed for update user !!!`);
        }
        const { email, oldPass, newPass, confirmedPass } = req.decoded;
        const updateOptions = { new: true, runValidators: true, context: 'query' }; // to apply schema validations when we update any field
        const isUserExist = await UserModel.findOne({ email });
        if (!isUserExist) {
            throw createError(404, `User of given mail id does not exists !!!`);
        }
        const userDoc = await UserModel.findOne({ email });
        const isPassMatched = await new UserModel().validatePassword(oldPass, userDoc);
        if (!isPassMatched) {
            throw createError(404, `Invalid Old Password, password does not exists !!!`);
        }
        if (newPass !== confirmedPass) {
            throw createError(400, `New Password and Confirmed Password should be same !!!`);
        }
        await UserModel.updateOne({ email: email }, { password: newPass }, updateOptions);
        successResponseHandler(res, {
            status: 200,
            message: `User's password of given mail id has been updated successfully`
        });
    } catch (error) {
        next(error);
    }
};

controller.handleFogetPassword = async (req, res, next) => {
    try {
        const { email, newPass } = req.body;
        const isExistUser = await UserModel.exists({ email: email });
        const updateOptions = { new: true, runValidators: true, context: 'query' }; // to apply schema validations when we update any field
        if (!isExistUser) {
            throw createError(404, `User of given mail id does not exists !!!`);
        }
        await UserModel.updateOne({ email: email }, { password: newPass }, updateOptions);
        throw createError(200, `Your password has been updated successfully`);
    } catch (error) {
        next(error);
    }
};

// Exporting the module ...
module.exports = controller;
console.log('user controller is loading ...');


