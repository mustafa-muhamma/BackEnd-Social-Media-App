const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

// create UserSchema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[A-Z][a-z]*$/.test(v);
            },
            message: props => `${props.value} you should start with a capitalCase !`
        }
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[A-Z][a-z]*$/.test(v);
            },
            message: props => `${props.value} you should start with a capitalCase !`
        }
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: (val) => { return validator.isEmail(val) },
            message: 'not valid'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        minLength: 10,
        maxLength: 11,
        unique: true
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    cover: {
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    gender: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: '',
    },
    bio: {
        type: String,
        default: '',
    },
    followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true
});

userSchema.methods.generateToken = function () {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
        {
            userid: this._id,
        },
        secret
    );
    return token;
}
const User = mongoose.model('User', userSchema);


module.exports = User;
