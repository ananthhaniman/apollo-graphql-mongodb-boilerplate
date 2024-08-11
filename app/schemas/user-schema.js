const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name required'],
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value) && validator.isAlpha(value);
                },
                message: _ => `Invalid first name.`,
            },
            set: (val) => val ? validator.escape(val) : null,
            get: (val) => val ? validator.unescape(val) : null
        },
        lastName: {
            type: String,
            required: [true, 'Last name required'],
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value) && validator.isAlpha(value);
                },
                message: _ => `Invalid last name.`,
            },
            set: (val) => val ? validator.escape(val) : null,
            get: (val) => val ? validator.unescape(val) : null
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email required'],
            lowercase: true,
            trim: true,
            index: true,
            validate: {
                validator: function (v) {
                    return validator.isEmail(v);
                },   
                message: props => `${props.value} is not a valid email!`
            }
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        active: {
            type: Boolean,
            default: true
        },
        lastActive: {
            type: Date,
            default: Date.now
        },
        accessKey: {
            type: String,
            required: true,
            index: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = { userSchema };