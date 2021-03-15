const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const logger = require('./logger');

mongoose.Promise = Promise;

const mongoServer = new MongoMemoryServer();

class Database {
    static async _connect({ option = {} } = {}) {

        const mongoUri = await mongoServer.getUri();

        const mongooseOpts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ...option
        };

        mongoose.connection.on('error', (e) => logger.info(e));

        mongoose.connection.once('open', () => {
            logger.info(`MongoDB successfully connected to ${mongoUri}`);
        });

        return mongoose.connect(mongoUri, mongooseOpts);
    }
}

module.exports = Database;
