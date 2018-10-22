"use strict";

const {MongoClient} = require(`mongodb`);

const url = `mongodb://localhost:27017`;

const dbName = `kekstagram`;

module.exports = MongoClient.connect(url)
  .then((client) => client.db(dbName))
  .catch((e) => {
    console.error(`Failed to connect to MongoDB`, e);
    process.exit(1);
  });
