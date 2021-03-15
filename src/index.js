const config = require('./config');
const { app } = require('./api');
const { logger, database } = require('./utils');

const PORT = config.server.port;

process.on('uncaughtException', (error) => {
    logger.error(JSON.stringify(error.stack));
    process.exit(1);
}).on('unhandledRejection', (error) => {
    logger.error(JSON.stringify(error.stack));
    process.exit(1);
});

const bootStrap = async () => {
    try {
        await database._connect();

        app.listen(PORT, () => {
            logger.info(`server started on port ${PORT} (${config.server.env})`);
            logger.info(`Listening: http://localhost:${PORT}`);
        });
    } catch (error) {
        logger.error(JSON.stringify(error.stack));
    }
};

bootStrap();
