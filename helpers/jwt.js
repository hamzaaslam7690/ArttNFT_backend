const jwt = require("jsonwebtoken");
const { promisify} = require('util');
const catchAsync = require('../utils/catchAsync');
const generateToken = async (payload) => {
    return  await jwt.sign({ payload }, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES_IN
       });
}
const verifyToken = async (token) => {
        return await promisify(jwt.verify)(token, process.env.JWT_SECRET);      
}

module.exports = {
    generateToken,
    verifyToken
}