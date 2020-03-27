const express = require('express');
const transferService = require('../service/TransferService.js');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const dbConfig = require('../../config/DatabaseConfig.js');


app.listen(port, () => console.log(`App listening on port ${port} !`));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', transferService.getAppDetails);

app.get('/transfers', transferService.getAllTransferDetails);

app.get('/transfers/:id', transferService.getTransferDetailsById);

app.post('/transfers', transferService.addTransferDetails);

app.put('/transfers/:id', transferService.updateTransferDetails);

app.delete('/transfers/:id', transferService.deleteTransferDetails);

//Transfer APIs
app.post('/transfers/balance', transferService.processTransfer);