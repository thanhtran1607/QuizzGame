const mongoose = require('mongoose');


async function connect(){
    try {
        await mongoose.connect(`mongodb://localhost:27017/Quizt_app`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('successfully');
    } catch (error) {
        console.log('failure');
    }
}

module.exports = { connect };