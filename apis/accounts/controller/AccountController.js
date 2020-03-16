const express = require('express');
const accountService = require('../service/AccountService.js');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const dbConfig = require('../../config/DatabaseConfig.js');


app.listen(port, () => console.log(`App listening on port ${port} !`));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//app.get('/', accountService.getAppDetails);

app.get('/accounts', accountService.getAllAccounts);

app.get('/accounts/:id', accountService.getAccountById);

app.post('/accounts', accountService.addAccount);

app.put('/accounts/:id', accountService.updateAccount);

app.delete('/accounts/:id', accountService.deleteAccount);