/** Load mongoose ODM external package **/
const { Schema, model } = require('mongoose');

/** Load bcryptjs external module for password hashing **/
const bcryptjs = require('bcryptjs');

/** Load path core modules **/
// const path = require('path');

/** Load fs core module **/
// const fs = require('node:fs');

/** Load config local module **/
const config = require('../config/config');

/** Load mongoose-unique-validator external plugin from npm for showing custom message for unique constraints **/
const uniqueValidator = require('mongoose-unique-validator');

const SALT_WORK_FACTOR = 10; // no. of rounds for hashing original password

// Read default image once
// const defaultImagePath = path.join(__dirname, '/../public/images/users/male-user-placeholder.png');
// const defaultImage = fs.readFileSync(defaultImagePath);
// const defaultImageBuffer = defaultImage.buffer.toString('base64');

// create a user schema by using mongoose 
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, '**user name is required'],
        trim: true,
        maxLength: [30, '**user name can not be exceeded 30 characters'],
        minLength: [3, '**user name can not be less than 3 characters']
    },
    email: {
        type: String,
        required: [true, '**user email is required'],
        trim: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not valid email Id`
        },
        unique: true,
        lowercase: true
    },
    phoneNo: {
        type: Number,
        required: [true, '**phone number is required'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, '**password is required'],
        set: v => bcryptjs.hashSync(v, bcryptjs.genSaltSync(SALT_WORK_FACTOR))
    },
    address: {
        type: String,
        required: [true, '**user address is required'],
        minLength: [3, '**user address should be atleast 3 characters']
    },
    avatar_url: {
        type: String,
        default: `${config.app.baseUrl}/users/male-user-placeholder.png`,
    },
    // avatar_url: {
    //     type: Buffer,
    //     contentType: String,
    //     default: defaultImageBuffer
    // },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBannedUsr: {
        type: Boolean,
        default: false
    }
}, { versionKey: false, timestamps: true });

/** Apply the uniqueValidator plugin to userSchema. **/
userSchema.plugin(uniqueValidator, { message: '{PATH} already exists' });

// userSchema.pre('save', async function save(next) {
// only hash the password if it has been modified (or is new)
//     if (!this.isModified('password')) return next();

// generate a salt
//     try {
//         const salt = await bcryptjs.genSalt(SALT_WORK_FACTOR);
//         this.password = await bcryptjs.hash(this.password, salt);
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// });

// instance methods of mongoose 
userSchema.methods.validatePassword = async function validatePassword(data, userDoc) {    
    return bcryptjs.compare(data, userDoc?.password); // optional chaining
};

// create a user model by mongoose
const UserModel = new model('User', userSchema);

module.exports = UserModel;
console.log('User model is loading ...');

