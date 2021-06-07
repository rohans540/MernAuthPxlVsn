const mongoose = require('mongoose');
const bcrytp = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [
            /^([a-z\d\.-_]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,6})?$/i,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
        minLength: 6,
        select: false
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
});

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    const salt = await bcrytp.genSalt(10);
    this.password = await bcrytp.hash(this.password, salt);
    next();
})

UserSchema.methods.matchPasswords = async function(password) {
    return await bcrytp.compare(password, this.password);
}

UserSchema.methods.getSignedToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRE,
     });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;