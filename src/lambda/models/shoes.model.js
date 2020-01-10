const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//All schema are like this. A schema is a blueprint for our datas. it represents how our todo items represents. What mongo db is gonna expect from our data.
const shoesSchema = new Schema({
    name: {
        type: String
    },
    color: {
        type: String
    },
    size: {
        type: Array
    },
    quantityInitial: {
        type: Number
    },
    quantityAvailable: {
        type: Number
    },
    gender: {
        type: String
    },
    price: {
        type: Number
    },
}, {
    timestamps: true, //created filed automatically
});


const Shoes = mongoose.model("Shoes", shoesSchema);

module.exports = Shoes;

// All of this will look like this for every Schema mongoose.