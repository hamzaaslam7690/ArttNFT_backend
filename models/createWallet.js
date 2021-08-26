const mongoose = require('mongoose');
const createWallet = new mongoose.Schema({
    seedPhrase: {
        type: String,
        required: [true, 'SeedPhrase can not be empty ']
    },
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    twitter: {
        type: String,
    },
    twitter: {
        type: String,
    },
    image:String
},
    {
        toJSON: { virtuals: true },
        toObject:{virtuals:true}
    });

const Review = mongoose.model('walletUser', createWallet);
module.exports = Review;