const mongooose = require('mongoose');

mongooose.Promise = global.Promise;

var url = 'mongodb://localhost:27017/moneytransferapi';

var dbConnection = mongooose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to database !!");
}).catch(error => {
    console.log(error.message || "Gort error while connecting to database !!");
    process.exit();
});

module.exports = dbConnection;