/** Load an app module **/
const app = require('./app');

/** Load config module **/
const config = require('./config/config');

/** Load logger of winston module **/
// const logger = require('./controllers/logger.controller');

/** Load db connection string utility functions **/
const connectDatabase = require('./config/db_config');

/** Define the server PORT No. **/
const PORT = config.app.apiPortNo;

/** Bind the server with the PORT No. **/
app.listen(PORT, async () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
    // logger.log('info', `Server is running at: http://localhost:${PORT}`);
    await connectDatabase();
});