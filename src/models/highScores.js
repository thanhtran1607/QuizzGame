const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const highscore = new Schema({
    username1: {
        type: String,
        required: true,
    },
    highscores: {
        type: String,
        required: true,
    },  
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('highScores',highscore);