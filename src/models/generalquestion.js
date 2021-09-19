const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalquestion = new Schema({
    question: {
        type: String,
        required: true
    },
    choice1 :{
        type: String,
        required: true
    },
    choice2 :{
        type: String,
        required: true
    },
    choice3 :{
        type: String,
        required: true
    },
    choice4 :{
        type: String,
        required: true
    },
    answer: {
    type:String,
    enum:['1','2','3','4']
    },
});

module.exports = mongoose.model('generalquestion',generalquestion);

