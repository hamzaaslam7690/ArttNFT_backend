const bip39 = require('bip39')
const catchAsync = require('../utils/catchAsync');
const createWallet = require('../models/createWallet')
const appError = require('../utils/appError')
const {generateToken} = require("../helpers/jwt");


exports.createSeedPhrase =catchAsync(async(req,res)=>{
    const seedPhrase = bip39.generateMnemonic()
    const newWallet= await createWallet.create({seedPhrase})
    const token = await generateToken(newWallet._id)
    res.status(200).json({seedPhrase:newWallet.seedPhrase,token})
})

exports.verifySeed =catchAsync(async(req,res,next)=>{
    const {seedPhrase} =req.body
    if(req.user.seedPhrase===seedPhrase){
        res.status(200).json({message:"success"})
    }else{
        return next(new appError('your seedPhrase not match',401));
    }
})