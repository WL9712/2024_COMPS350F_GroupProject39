const mongoose = require('mongoose');


class AccountBalanceModel {
    
    constructor() {
        this.accountBalanceSchema = new mongoose.Schema({
            accountNumber: {
                type: String,
                required: true,
                unique: true
            },
            balance: {
                type: Number,
                required: true,
                default: 0
            },
            lastUpdated: {
                type: Date,
                default: Date.now
            }
        });

        if (!mongoose.models.Restaurant) {
            this.AccountBalance = mongoose.model('AccountBalance', this.accountBalanceSchema);
        } else {
            this.AccountBalance = mongoose.models.AccountBalance; 
        }
        
    }

    create(data) {
        const accountBalance = new this.model(data);
        return accountBalance.save();
    }

    findByAccountNumber(accountNumber) {
        return this.model.findOne({ accountNumber });
    }

    updateBalance(accountNumber, newBalance) {
        return this.model.findOneAndUpdate(
            { accountNumber },
            { balance: newBalance, lastUpdated: Date.now() },
            { new: true }
        );
    }
}

module.exports = new AccountBalanceModel();