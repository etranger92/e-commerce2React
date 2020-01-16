const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//All schema are like this. A schema is a blueprint for our datas. it represents how our todo items represents. What mongo db is gonna expect from our data.
const transactionSchema = new Schema({
    name: {
        type: String
    },
    id: {
        type: String
    },
    address: {
        type: String
    }

}, {
    timestamps: true, //created filed automatically
});


const Transactions = mongoose.model("Transactions", transactionSchema);

module.exports = Transactions;