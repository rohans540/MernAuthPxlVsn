const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');


exports.protect = async (req, res, next) => {
    let token;

    console.log(req.headers);

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return next(new ErrorResponse('Unauthorized access', 401));
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decode.id);

        if(!user) {
            return next(new ErrorResponse("User not found", 404));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new ErrorResponse("Unauthorized", 401));
    }
}