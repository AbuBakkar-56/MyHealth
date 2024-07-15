const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User must have a name'],
        minLength: [3, 'User name should have at least 3 chars'],
        maxLength: [25, 'User name should not be longer than 25 chars'],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\s]+$/.test(v); // Validate that the name contains only alphabetic characters and spaces
            },
            message: props => `${props.value} is not a valid name! Only alphabetic characters and spaces are allowed.`
        }
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'User must have email'],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: [true, 'User must have password specified'],
        minLength: [8, 'Password must have 8 characters'],
        maxLength: [20, 'Password should not be longer than 20 characters']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Must provide confirm password'],
        validate: {
            validator: function (val) {
                return this.password === val;
            },
            message: 'Passwords do not match'
        }
    },
    photo: {
        type: String,
        // default: 'img-default.jpeg'
    },
    passwordChangedAt: {
        type: Date
    },
    role: {
        type: String,
        enum: ['User', 'Doctor', 'Admin'],
        default: 'User'
    },
    doctorProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors'
    },
    resetToken: {
        type: String
    },
    tokenExpiresIn: {
        type: Date
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const genSalt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, genSalt);
    this.confirmPassword = undefined;
    next();
});

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password') || this.isNew) {
            return next();
        }
        this.passwordChangedAt = new Date();
        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
});

userSchema.methods.generateResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.tokenExpiresIn = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
};

const user = mongoose.model('user', userSchema);
module.exports = user;
