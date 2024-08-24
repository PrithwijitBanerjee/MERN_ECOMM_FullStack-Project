/** Load winston external logger **/
const { createLogger, format, transports } = require('winston');

/** Load config local module **/
const config = require('../config/config');

const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A', // 2022-01-25 03:23:10.350 PM
    }), format.json()),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File({
            filename: __dirname + '/../logs/info.log',
            level: 'info',
            maxFiles: 5,
            maxsize: 5242880 // 5mb
        }),
        new transports.File({
            filename: __dirname + '/../logs/error.log',
            level: 'error',
            maxFiles: 5,
            maxsize: 5242880 // 5mb
        }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (config.app.apiEnviroment !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
    }));
}

module.exports = logger;