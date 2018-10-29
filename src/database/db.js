"use strict";

const {MongoClient} = require(`mongodb`);
const logger = require(`../logger`);

const {DB_HOST = `localhost:27017`, DB_PATH = `kekstagram`} = process.env;

const url = `mongodb://${DB_HOST}`;

if (process.argv[2] === `--server`) {
  module.exports = MongoClient.connect(url)
    .then((client) => client.db(DB_PATH))
    .catch((e) => {
      logger.error(`Failed to connect to MongoDB`, e);
      process.exit(1);
    });
} else {
  module.exports = null;
}
