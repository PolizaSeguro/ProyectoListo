const mongoose = require('mongoose');

require('dotenv').config()

const USER_DB= process.env.DB_NAME
const PASSWORD_DB= process.env.DB_PASS

const connectDB = async () => {

    try {
        await mongoose.connect(`mongodb+srv://${USER_DB}:${PASSWORD_DB}@cluster0.siazy3p.mongodb.net/`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;