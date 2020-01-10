const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//All schema are like this. A schema is a blueprint for our datas. it represents how our todo items represents. What mongo db is gonna expect from our data.
const exerciseSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },

}, {
    timestamps: true, //created filed automatically
});

//this what is going to be push as prototype based from exerciceSchema to your mongoDB
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;