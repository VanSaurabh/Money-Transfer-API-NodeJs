const Transfer = require('../model/Transfer.js');

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