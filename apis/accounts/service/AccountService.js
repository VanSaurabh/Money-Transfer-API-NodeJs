const Account = require('../model/Account.js');

exports.addAccount = (request, response) => {
    if(request != undefined && null != request){
        if(request.body != undefined && null != request.body) {
            const account = new Account({
                accountNumber: request.body.accountNumber,
                accountType: request.body.accountType,
                balance: request.body.balance,
                currencyCode: request.body.currencyCode
            });
            account.save().then(data => {
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

exports.getAllAccounts = (request, response) => {
    Account.find()
    .then(accounts =>{
        if(!accounts){
            response.status(404).send({message: "Accounts not found !!"});
        }
        response.status(200).send(accounts);
    }).catch(error => {
        response.status(500).send({message: error.message || "Some internal error occurred !!"});
    });
};

exports.getAccountById = (request, response) => {
   if(request != undefined && null != request && request.params != undefined && null != request.params){
        Account.findById(request.params.id)
        .then(account => {
            if(!account){
                response.status(404).send({message: "Account not found !!"});
            }
            response.status(200).send(account);
        }).catch(error => {
            response.status(500).send({message: error.message || "Some internal error occurred !!"});
        });    
   }else{
        response.status(400).send({message:"Invalid input !!"});
   }
};

exports.updateAccount = (request, response) => {
    if(request != undefined && null != request
        && request.params != undefined && null != request.params
        && request.body != undefined && null != request.body){
        Account.findByIdAndUpdate(request.params.id, {
            accountNumber: request.body.accountNumber,
            accountType: request.body.accountType,
            balance: request.body.balance,
            currencyCode: request.body.currencyCode
        }, {new : true})
        .then(account =>{
            if(!account){
                response.status(404).send({message: "Account not found with id " + request.params.id + " !!"});
            }
            response.status(200).send(account);
        }).catch(error => {
            response.status(500).send({message: error.message || "Some internal error occurred !!"});
        });
    }else{
        response.status(400).send({message:"Invalid input !!"});
    }
};

exports.deleteAccount = (request, response) => {
    if(request != undefined && null != request
        && request.params != undefined && null != request.params){
        Account.findByIdAndDelete(request.params.id)
        .then(account => {
            if(!account){
                response.status(404).send({message: "Account not found with id " + request.params.id + " !!"});
            }
            response.status(204).send({message: "Account deleted successfully !!"});
        }).catch(error => {
            response.status(500).send({message: error.message || "Some internal error occurred !!"});
        });
    }else{
        response.status(400).send({message:"Invalid input !!"});
    }
};