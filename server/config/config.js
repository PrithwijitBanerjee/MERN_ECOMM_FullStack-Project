/** Load dotenv external middleware and configure it globally **/
require('dotenv').config();

const dev = {
    app: {
        apiUrl: process.env.API_URL,
        apiEnviroment: process.env.NODE_ENV,
        apiPortNo: process.env.NODE_ENV === "production" ? 3002 : (process.env.NODE_ENV === "developement" ? process.env.PORT : process.env.LOCAL_PORT),
        baseUrl: process.env.BASE_URL,
        jwtActivationKey: process.env.JWT_ACTIVATION_KEY ? process.env.JWT_ACTIVATION_KEY : "",
        jwtAcessKey: process.env.JWT_ACCESS_KEY ? process.env.JWT_ACCESS_KEY : "",
        jwtRefreshKey: process.env.JWT_REFRESH_KEY ? process.env.JWT_REFRESH_KEY : "",
        smtpPass: process.env.SMTP_PASSWORD || "cgkr vmrq dkbz zowk",
        smtpUsrName: process.env.SMTP_USERNAME,
        clientUrl: process.env.CLIENT_URL ? process.env.CLIENT_URL : "http://localhost:3000",
        limitFileSize: process.env.LIMIT_FILE_SIZE ? process.env.LIMIT_FILE_SIZE : 5242880,
        allowedFileTypes: process.env.ALLOWED_FILE_TYPES ? process.env.ALLOWED_FILE_TYPES : ['jpg', 'jpeg', 'png', 'gif'],
    },
    db: {
        dbUrl: process.env.NODE_ENV === "production" ? process.env.ATLAS_DB_URL : process.env.COMPASS_DB_URL,
        dbName: process.env.DB_NAME,
        dbPort: process.env.DB_PORT
    }
};

module.exports = dev;