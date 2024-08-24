/** Load mongoose external ODM/ORM module connection driver between express and mongoDb **/
const mongoose = require('mongoose');

/** Load config module **/
const config = require('./config');

/** Load logger of winston module **/
// const logger = require('../controllers/logger.controller');

// utility function for db connection of server
const connectDatabase = async (options = {}) => {
    try {
        await mongoose.connect(config.db.dbUrl, options);
        console.log('Connection to DB is successfully established');
        // logger.log('info', 'Connection to DB is successfully established');
        // error in db credentials after successfull connection
        mongoose.connection.on('error', (error) => {
            console.log('Database connection error: ', error);
            // logger.log('error', 'Database connection error:' + error);
        });
    } catch (error) {
        console.log("couldn't connect to db: ", error?.toString());
        // logger.log('error', "couldn't connect to db: " + error?.toString());
        process.exit(1);
    }
};


module.exports = connectDatabase;