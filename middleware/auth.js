const {verifyToken} = require("../helpers/jwt");
const jwt = require("jsonwebtoken");
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError')
const { promisify} = require('util');
const createWallet = require('../models/createWallet');
const protect = catchAsync( async(req,res, next) => {
    let token;
    // Getting Token and check of it ,s there
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; 
    }
    if (!token) {
        return next(new appError('you are not logged in! Please log into get access',401));
    }
    // varification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await createWallet.findById(decoded.payload);
    if (!currentUser) {
        return next(new appError('Ther user beloning to this token does no longer exist',401));
    }
    req.user = currentUser;
    next();    
})

module.exports = protect;