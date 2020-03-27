const Transfer = require('../model/Transfer.js');
const Account = require('../../accounts/model/Account.js');

exports.addTransferDetails = (request, response) => {
    if(request != undefined && null != request){
        if(request.body != undefined && null != request.body) {
            const transfer = new Transfer({
                depositAccountNumber : request.body.depositAccountNumber,
                withdrawAccountNumber : request.body.withdrawAccountNumber,
                accountType: request.body.accountType,
                balance: request.body.balance,
                currencyCode: request.body.currencyCode
            });
            transfer.save().then(data => {
                response.status(201).send(data);
            }).catch(error => {
                response.status(500).send({message: error.message || "Some internal error occurred !!"});
            });
        }else{
            response.status(400).send({message:"Invalid input !!"});
        }
    }else{
        response.status(400).send({message:"Invalid input !!"});
    }
};

exports.getAllTransferDetails = (request, response) => {
    Transfer.find()
    .then(transfers =>{
        if(!transfers){
            response.status(404).send({message: "Transfer details not found !!"});
        }
        response.status(200).send(transfers);
    }).catch(error => {
        response.status(500).send({message: error.message || "Some internal error occurred !!"});
    });
};

exports.getTransferDetailsById = (request, response) => {
   if(request != undefined && null != request && request.params != undefined && null != request.params){
    Transfers.findById(request.params.id)
        .then(transfer => {
            if(!transfer){
                response.status(404).send({message: "Transfer details not found !!"});
            }
            response.status(200).send(transfer);
        }).catch(error => {
            response.status(500).send({message: error.message || "Some internal error occurred !!"});
        });    
   }else{
        response.status(400).send({message:"Invalid input !!"});
   }
};

exports.updateTransferDetails = (request, response) => {
    if(request != undefined && null != request
        && request.params != undefined && null != request.params
        && request.body != undefined && null != request.body){
        Transfer.findByIdAndUpdate(request.params.id, {
            depositAccountNumber : request.body.depositAccountNumber,
            withdrawAccountNumber : request.body.withdrawAccountNumber,
            accountType: request.body.accountType,
            balance: request.body.balance,
            currencyCode: request.body.currencyCode
        }, {new : true})
        .then(transfer =>{
            if(!transfer){
                response.status(404).send({message: "Transfer details not found with id " + request.params.id + " !!"});
            }
            response.status(200).send(transfer);
        }).catch(error => {
            response.status(500).send({message: error.message || "Some internal error occurred !!"});
        });
    }else{
        response.status(400).send({message:"Invalid input !!"});
    }
};

exports.deleteTransferDetails = (request, response) => {
    if(request != undefined && null != request
        && request.params != undefined && null != request.params){
        Transfer.findByIdAndDelete(request.params.id)
        .then(transfer => {
            if(!transfer){
                response.status(404).send({message: "Transfer details not found with id " + request.params.id + " !!"});
            }
            response.status(204).send({message: "Transfer details deleted successfully !!"});
        }).catch(error => {
            response.status(500).send({message: error.message || "Some internal error occurred !!"});
        });
    }else{
        response.status(400).send({message:"Invalid input !!"});
    }
};

exports.getAppDetails = (request, response) => {
    response.status(200).send(`<h1>Welcome to money transfer API</h1>`);
};

exports.processTransfer = (request, response) => {
    if(request != undefined && null != request && request.params != undefined && null != request.params){

        const transfer = new Transfer({
            depositAccountNumber : request.body.depositAccountNumber,
            withdrawAccountNumber : request.body.withdrawAccountNumber,
            accountType: request.body.accountType,
            balance: request.body.balance,
            currencyCode: request.body.currencyCode
        });
        console.log(transfer.depositAccountNumber+" " +transfer.withdrawAccountNumber+" "+transfer.balance);
        var depositAccount;
        var withdrawAccount;
        Account.findOne({
            'accountNumber' : transfer.depositAccountNumber
        }, function(err, account) {
            if(err) throw err;
            depositAccount = account;
            console.log(depositAccount);
            depositAccount.balance = depositAccount.balance + transfer.balance;
            depositAccount.save().then(data => {
                response.status(200).send(data);
            }).catch(error => {
                response.status(500).send({message: error.message || "Some internal error occurred !!"});
            });
        });

        Account.findOne({
            'accountNumber' : transfer.withdrawAccountNumber
        }, function(err, account) {
            if(err) throw err;
            withdrawAccount = account;
            console.log(withdrawAccount);
            if(null != transfer.balance && undefined != transfer.balance 
                && transfer.balance > 0){
                if(withdrawAccount.balance > transfer.balance) {
                withdrawAccount.balance = withdrawAccount.balance - transfer.balance;
                }else{
                    response.status(400).send({message: "The account does not have sufficient balance"});
                }
            }else {
                response.status(400).send({message: "Invalid input !!"});
            }
            withdrawAccount.save().then(data => {
                response.status(200).send(data);
            }).catch(error => {
                response.status(500).send({message: error.message || "Some internal error occurred !!"});
            });
        });
    }else {
        response.status(400).send({message:"Invalid input !!"});
    }
};