const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    accountNumber : Number,
    accountType: String,
    balance: Number,
    currencyCode: String
});

module.exports = mongoose.model('Account', accountSchema);