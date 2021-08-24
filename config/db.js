const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
//mongoURI가져오기

//mongoDB 연결하기
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('mongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;