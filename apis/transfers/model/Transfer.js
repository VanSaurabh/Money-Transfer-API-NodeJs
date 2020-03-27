const mongoose = require('mongoose');

const transferSchema = mongoose.Schema({
    depositAccountNumber : Number,
    withdrawAccountNumber : Number,
    accountType: String,
    transactionBalance: Number,
    currencyCode: String
});

module.exports = mongoose.model('Transfer', transferSchema);