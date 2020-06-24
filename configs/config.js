const logger = require('./winston');

module.exports = {
    PORT: process.env.PORT || 3000,

    DB_NAME: process.env.DB_NAME || 'shop',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',
    API: process.env.API || API,
    KEY: process.env.KEY || 'key',
    TOKEN: process.env.TOKEN || 'exampleToken',

    logger
};
